// hooks/Usetestsession.jsx — bug-fixed version
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "../features/Store";
import { addAttemptLocal, updateAttemptLocal } from "../features/slice/Attemptslice";
import { startAttempt, submitAttempt, updateAttemptProgress } from "../action/student";

export function useTestSession(opts = {}) {
  const {
    testId,
    testType,
    testTitle,
    seriesId    = "",
    testNumber  = 0,
    userId,
    totalSeconds = 40 * 60,
  } = opts;

  const dispatch = useAppDispatch();

  const [attemptId,   setAttemptId]   = useState(null);
  const [started,     setStarted]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [timeLeft,    setTimeLeft]    = useState(totalSeconds);
  const [showResult,  setShowResult]  = useState(false);
  const [result,      setResult]      = useState(null);
  const [answers,     setAnswers]     = useState({});
  const [writingResp, setWritingResp] = useState([]);

  const attemptIdRef  = useRef(null);
  const answersRef    = useRef({});
  const writingRef    = useRef([]);
  const submittedRef  = useRef(false);
  const startedAtRef  = useRef(0);
  const timerRef      = useRef(null);
  const autosaveRef   = useRef(null);

  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => { writingRef.current = writingResp; }, [writingResp]);

  const autoSaveProgress = useCallback(async () => {
    const aid = attemptIdRef.current;
    if (!aid || submittedRef.current) return;
    try {
      await updateAttemptProgress(aid, {
        answers: answersRef.current,
        writingResponses: writingRef.current,
      });
    } catch (e) {
      console.error("Auto-save failed:", e);
    }
  }, []);

  const doSubmit = useCallback(async () => {
    if (submittedRef.current) return;
    const aid = attemptIdRef.current;
    if (!aid) { setError("No attempt ID — please refresh and try again."); return; }

    submittedRef.current = true;
    setSubmitted(true);
    if (timerRef.current)    clearInterval(timerRef.current);
    if (autosaveRef.current) clearInterval(autosaveRef.current);

    setLoading(true);
    const timeSpent = Math.floor((Date.now() - startedAtRef.current) / 1000);

    try {
      const response = await submitAttempt(aid, answersRef.current, writingRef.current, timeSpent);
      if (!response?.data?.result) throw new Error("Invalid server response");

      const resultData = { ...response.data.result, timeSpent };
      setResult(resultData);
      setShowResult(true);

      let band = resultData.overallBand
        ?? (testType === "listening" ? resultData.listeningBand : null)
        ?? (testType === "reading"   ? resultData.readingBand   : null)
        ?? null;

      let score = testType === "listening" ? resultData.listeningScore
        : testType === "reading"   ? resultData.readingScore
        : undefined;

      let sectionScores = testType === "listening" ? (resultData.listeningSectionScores || [])
        : testType === "reading"   ? (resultData.readingSectionScores  || [])
        : [];

      dispatch(updateAttemptLocal({
        attemptId: aid, band, score,
        totalQuestions: resultData.totalQuestions,
        sectionScores,
        questionResults: resultData.questionResults || [],
        writingPending: resultData.writingPending,
        timeSpent, status: "submitted",
        submittedAt: new Date().toISOString(),
      }));
    } catch (e) {
      console.error("Submission error:", e);
      setError(e instanceof Error ? e.message : "Failed to submit. Please try again.");
      submittedRef.current = false;
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, testType]);

  const startSession = useCallback(async () => {
    // Don't throw — just show an error so the UI doesn't crash
    if (!userId || !testId) {
      setError("Session not ready — please wait a moment and try again.");
      return;
    }
    if (started) return;

    setLoading(true);
    setError(null);

    try {
      const response = await startAttempt(testType, testId, userId);
      if (!response?.data?.attemptId) throw new Error("Server did not return an attemptId");

      const aid = String(response.data.attemptId);
      attemptIdRef.current = aid;
      startedAtRef.current = Date.now();
      setAttemptId(aid);
      setStarted(true);
      setError(null);

      dispatch(addAttemptLocal({
        _id: aid, attemptId: aid, testId, testType, testTitle,
        seriesId, testNumber, status: "in_progress",
        startedAt: new Date().toISOString(), answers: {}, writingResponses: [],
      }));

      autosaveRef.current = setInterval(autoSaveProgress, 30_000);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            if (timerRef.current)    clearInterval(timerRef.current);
            if (autosaveRef.current) clearInterval(autosaveRef.current);
            doSubmit();
            return 0;
          }
          return next;
        });
      }, 1000);
    } catch (e) {
      console.error("Failed to start session:", e);
      setError(e instanceof Error ? e.message : "Failed to start test. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [started, userId, testId, testType, testTitle, seriesId, testNumber, dispatch, doSubmit, autoSaveProgress]);

  const setAnswer = useCallback((qNum, val) => {
    setAnswers((prev) => ({ ...prev, [String(qNum)]: val }));
  }, []);

  const setWritingResponse = useCallback((taskNumber, responseText) => {
    setWritingResp((prev) => {
      const idx = prev.findIndex((r) => r.taskNumber === taskNumber);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { taskNumber, responseText };
        return next;
      }
      return [...prev, { taskNumber, responseText }];
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!submitted) doSubmit();
  }, [submitted, doSubmit]);

  useEffect(() => {
    return () => {
      if (timerRef.current)    clearInterval(timerRef.current);
      if (autosaveRef.current) clearInterval(autosaveRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.floor(seconds));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const answeredCount = Object.values(answers).filter(
    (v) => typeof v === "string" && v.trim() !== ""
  ).length;

  return {
    attemptId, started, submitted, loading, error,
    answers, writingResp, timeLeft,
    timeFormatted: formatTime(timeLeft),
    isLowTime: timeLeft > 0 && timeLeft < 5 * 60,
    result, showResult, answeredCount,
    setShowResult, setAnswer, setWritingResponse,
    startSession, handleSubmit,
  };
}
