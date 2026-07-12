import { useAuthStore } from "@/features/Useauthstore"; // adjust path

function getToken() {
  return useAuthStore.getState().token;
}

import {
  deleteTestSession,
  getTestSession,
  updateTestSession,
} from "@/action/test";

/**
 * Syncs the current session state to the server.
 * Safe to call any time — skips silently if user is not logged in.
 *
 * @param {string|number} testId
 * @param {object} sessionData  — the full session object from Zustand
 */
export async function syncSessionToServer(testId, sessionData) {
  try {
    if (!getToken()) return;

    const { data } = await updateTestSession({ testId, sessionData });

    if (!data.ok) {
      console.warn(`[sync] PUT /api/test-sessions/${testId} →`, res.status);
    }
  } catch (err) {
    // Network error — non-fatal. Zustand already persisted to localStorage.
    console.warn("[sync] Session sync failed (will retry on next save):", err);
  }
}

// ── PULL: fetch session from server ───────────────────────────

/**
 * Loads a test session from the server for the logged-in user.
 * Returns null if not logged in, no session found, or request fails.
 *
 * @param {string|number} testId
 * @returns {Promise<object|null>}
 */
export async function loadSessionFromServer(testId) {
  try {
    if (!getToken()) return;
    const { data: res } = await getTestSession({ testId });
    if (!res.ok) {
      console.warn(`[sync] GET /api/test-sessions/${testId} →`, res.status);
      return null;
    }
    return await res.json(); // returns sessionData shape
  } catch (err) {
    console.warn("[sync] Failed to load session from server:", err);
    return null;
  }
}

/**
 * Deletes a test session from the server (used on resetSession).
 * Safe to call any time — skips silently if user is not logged in.
 *
 * @param {string|number} testId
 */
export async function deleteSessionFromServer(testId) {
  try {
    if (!getToken()) return;
    await deleteTestSession({ testId });
  } catch (err) {
    console.warn("[sync] Failed to delete session from server:", err);
  }
}
