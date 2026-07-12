// features/Useteststore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  syncSessionToServer,
  deleteSessionFromServer,
} from "@/features/Synctestsession";

// ─── Section definitions ──────────────────────────────────────

export const SECTION_ORDER = ["listening", "reading", "writing"];

export const SECTION_DURATIONS = {
  listening: 40,
  reading: 60,
  writing: 60,
};

export const SECTION_ROUTES = {
  listening: "/full-test/[id]/listening",
  reading: "/full-test/[id]/reading",
  writing: "/full-test/[id]/writing",
};

// ─── Helpers ──────────────────────────────────────────────────

function makeSection(id, locked) {
  return {
    status: locked ? "locked" : "not-started",
    startedAt: null,
    secondsLeft: SECTION_DURATIONS[id] * 60,
    answers: {},
    submittedAt: null,
  };
}

export function makeInitialSections() {
  return {
    listening: makeSection("listening", false),
    reading: makeSection("reading", true),
    writing: makeSection("writing", true),
  };
}

function makeSession(testId, testTitle) {
  return {
    testId,
    testTitle,
    sessionStart: Date.now(),
    activeSectionId: "listening",
    sections: makeInitialSections(),
    isComplete: false,
  };
}

// ─── Store ────────────────────────────────────────────────────

export const useTestStore = create(
  persist(
    (set, get) => ({
      sessions: {},    
      activeTestId: null,

      // ── Internal helpers ──────────────────────────────────

      _getSession() {
        const { sessions, activeTestId } = get();
        return sessions[activeTestId] ?? null;
      },

      _setSession(updater) {
        const { activeTestId } = get();
        if (!activeTestId) return;
        set((state) => ({
          sessions: {
            ...state.sessions,
            [activeTestId]: updater(state.sessions[activeTestId]),
          },
        }));
      },

      // ── Session init ──────────────────────────────────────

      initSession(testId, testTitle) {
        set({ activeTestId: testId });
        const { sessions } = get();
        if (sessions[testId]) {
          get().rehydrateTimers(testId);
          return;
        }
        set((state) => ({
          sessions: {
            ...state.sessions,
            [testId]: makeSession(testId, testTitle),
          },
        }));
      },

      /**
       * Called after login to merge server session into Zustand.
       * Server wins over any existing local state.
       */
      mergeServerSession(testId, serverSession) {
        set((state) => ({
          activeTestId: testId,
          sessions: {
            ...state.sessions,
            [testId]: serverSession,
          },
        }));
        get().rehydrateTimers(testId);
      },

      // ── Section actions ───────────────────────────────────

      startSection(sectionId) {
        get()._setSession((session) => ({
          ...session,
          activeSectionId: sectionId,
          sections: {
            ...session.sections,
            [sectionId]: {
              ...session.sections[sectionId],
              status: "in-progress",
              startedAt: Date.now(),
              secondsLeft: SECTION_DURATIONS[sectionId] * 60,
            },
          },
        }));

        // Sync updated session to server
        const { activeTestId, sessions } = get();
        syncSessionToServer(activeTestId, sessions[activeTestId]);
      },

      saveAnswer(sectionId, questionKey, value) {
        get()._setSession((session) => ({
          ...session,
          sections: {
            ...session.sections,
            [sectionId]: {
              ...session.sections[sectionId],
              answers: {
                ...session.sections[sectionId].answers,
                [questionKey]: value,
              },
            },
          },
        }));
        // Note: individual keystrokes are NOT synced to avoid hammering the server.
        // Use saveAllAnswers (called on submit / section change) for persistence.
      },

      saveAllAnswers(sectionId, answers) {
        get()._setSession((session) => ({
          ...session,
          sections: {
            ...session.sections,
            [sectionId]: {
              ...session.sections[sectionId],
              answers,
            },
          },
        }));

        // Sync to server — called on section submit / explicit save
        const { activeTestId, sessions } = get();
        syncSessionToServer(activeTestId, sessions[activeTestId]);
      },

      submitSection(sectionId) {
        const session = get()._getSession();
        if (!session) return;

        const idx = SECTION_ORDER.indexOf(sectionId);
        const nextId = SECTION_ORDER[idx + 1];
        const allDone = !nextId;

        get()._setSession((s) => ({
          ...s,
          isComplete: allDone,
          activeSectionId: nextId ?? sectionId,
          sections: {
            ...s.sections,
            [sectionId]: {
              ...s.sections[sectionId],
              status: "completed",
              submittedAt: Date.now(),
              secondsLeft: 0,
            },
            ...(nextId
              ? { [nextId]: { ...s.sections[nextId], status: "not-started" } }
              : {}),
          },
        }));

        // Sync completed section state to server (most critical sync point)
        const { activeTestId, sessions } = get();
        syncSessionToServer(activeTestId, sessions[activeTestId]);
      },

      // ── Timer ─────────────────────────────────────────────

      tickTimer(sectionId) {
        const session = get()._getSession();
        if (!session) return;

        const section = session.sections[sectionId];
        if (section.status !== "in-progress") return;

        if (section.secondsLeft <= 1) {
          get()._setSession((s) => ({
            ...s,
            sections: {
              ...s.sections,
              [sectionId]: {
                ...s.sections[sectionId],
                status: "time-up",
                secondsLeft: 0,
              },
            },
          }));
          setTimeout(() => get().submitSection(sectionId), 500);
          return;
        }

        get()._setSession((s) => ({
          ...s,
          sections: {
            ...s.sections,
            [sectionId]: {
              ...s.sections[sectionId],
              secondsLeft: s.sections[sectionId].secondsLeft - 1,
            },
          },
        }));
        // No sync here — secondsLeft is recalculated from startedAt on rehydration
      },

      rehydrateTimers(testId) {
        const id = testId ?? get().activeTestId;
        if (!id) return;

        const now = Date.now();
        set((state) => {
          const session = state.sessions[id];
          if (!session) return {};

          const sections = { ...session.sections };

          for (const sId of SECTION_ORDER) {
            const s = sections[sId];
            if (s.status === "in-progress" && s.startedAt !== null) {
              const elapsed = Math.floor((now - s.startedAt) / 1000);
              const total = SECTION_DURATIONS[sId] * 60;
              const remaining = total - elapsed;

              if (remaining <= 0) {
                sections[sId] = { ...s, status: "time-up", secondsLeft: 0 };
                setTimeout(() => get().submitSection(sId), 500);
              } else {
                sections[sId] = { ...s, secondsLeft: remaining };
              }
            }
          }

          return {
            sessions: { ...state.sessions, [id]: { ...session, sections } },
          };
        });
      },

      // ── Reset ─────────────────────────────────────────────

      resetSession(testId) {
        const id = testId ?? get().activeTestId;
        if (!id) return;
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: makeSession(id, state.sessions[id]?.testTitle ?? ""),
          },
        }));
        // Remove from server too
        deleteSessionFromServer(id);
      },

      resetAllSessions() {
        // Delete each session from server
        const { sessions } = get();
        Object.keys(sessions).forEach((id) => deleteSessionFromServer(id));
        set({ sessions: {}, activeTestId: null });
      },
    }),
    {
      name: "ieltsmill-test-sessions",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────

export const selectActiveSession = (s) => s.sessions[s.activeTestId] ?? null;

export const selectSections = (s) =>
  s.sessions[s.activeTestId]?.sections ?? makeInitialSections();

export const selectActiveSectionId = (s) =>
  s.sessions[s.activeTestId]?.activeSectionId ?? "listening";

export const selectIsComplete = (s) =>
  s.sessions[s.activeTestId]?.isComplete ?? false;

export const selectSection = (id) => (s) =>
  s.sessions[s.activeTestId]?.sections[id] ?? makeSection(id, id !== "listening");

export const selectAnswers = (id) => (s) =>
  s.sessions[s.activeTestId]?.sections[id].answers ?? {};

export const selectAnsweredCount = (id) => (s) => {
  const answers = s.sessions[s.activeTestId]?.sections[id].answers ?? {};
  return Object.values(answers).filter((a) => a !== null && a !== "").length;
};

export const selectOverallProgress = (s) => {
  const session = s.sessions[s.activeTestId];
  if (!session) return 0;
  const done = SECTION_ORDER.filter(
    (id) =>
      session.sections[id].status === "completed" ||
      session.sections[id].status === "time-up",
  ).length;
  return Math.round((done / SECTION_ORDER.length) * 100);
};