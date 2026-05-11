import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserAttempts,
  studentTotalAttempt,
  submitAttempt,
} from "../../action/student";

// Async thunks for API calls
export const fetchUserAttempts = createAsyncThunk(
  "attempts/fetchUserAttempts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await studentTotalAttempt(userId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const submitAttemptw = createAsyncThunk(
  "attempts/submitAttemptw",
  async ({ attemptId, attemptData }, { rejectWithValue }) => {
    try {
      const response = await submitAttempt(attemptId, attemptData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  syncStatus: "idle", // 'idle', 'syncing', 'synced', 'error'
};

const attemptSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    // Local actions for offline support
    addAttemptLocal(state, action) {
      const payload = action.payload;
      // Remove existing in_progress for same test
      state.list = state.list.filter(
        (a) => !(a.testId === payload.testId && a.status === "in_progress"),
      );
      state.list.push(payload);
    },

    updateAttemptLocal(state, action) {
      const payload = action.payload;
      const index = state.list.findIndex(
        (a) => a.attemptId === payload.attemptId,
      );
      if (index >= 0) {
        state.list[index] = {
          ...state.list[index],
          ...payload,
          status: "submitted",
        };
      }
    },

    clearAll(state) {
      state.list = [];
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user attempts
      .addCase(fetchUserAttempts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAttempts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.attempts || [];
        state.syncStatus = "synced";
      })
      .addCase(fetchUserAttempts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.syncStatus = "error";
      })
      // Submit attempt
      .addCase(submitAttemptw.fulfilled, (state, action) => {
        const updatedAttempt = action.payload;
        const index = state.list.findIndex(
          (a) => a.attemptId === updatedAttempt.attemptId,
        );
        if (index >= 0) {
          state.list[index] = updatedAttempt;
        }
      });
  },
});

export const {
  addAttemptLocal,
  updateAttemptLocal,
  clearAll,
  setLoading,
  setError,
} = attemptSlice.actions;

export default attemptSlice.reducer;

// ─── Selectors ─────────────────────────────────────────
export const selectLatest = (testId) => (state) => {
  const all = state.attempts.list.filter((a) => a.testId === testId);
  return all.length ? all[all.length - 1] : null;
};

export const selectIsCompleted = (testId) => (state) =>
  state.attempts.list.some(
    (a) => a.testId === testId && a.status === "submitted",
  );

export const selectIsInProgress = (testId) => (state) =>
  state.attempts.list.some(
    (a) => a.testId === testId && a.status === "in_progress",
  );

export const selectStats = (state) => {
  const done = state.attempts.list.filter((a) => a.status === "submitted");

  const bands = done
    .map((a) => a.overallBand || a.band)
    .filter((b) => b != null);

  // Calculate total time spent
  const totalTimeSpent = done.reduce((sum, a) => sum + (a.timeSpent || 0), 0);

  return {
    total: done.length,
    listening: done.filter((a) => a.testType === "listening").length,
    reading: done.filter((a) => a.testType === "reading").length,
    writing: done.filter((a) => a.testType === "writing").length,
    full: done.filter((a) => a.testType === "full").length,
    avgBand: bands.length
      ? +(bands.reduce((a, b) => a + b, 0) / bands.length).toFixed(1)
      : null,
    bestBand: bands.length ? Math.max(...bands) : null,
    totalTimeSpent,
  };
};

export const selectAttemptsLoading = (state) => state.attempts.loading;
export const selectAttemptsError = (state) => state.attempts.error;
