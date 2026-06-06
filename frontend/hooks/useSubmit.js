import { useState } from "react";

export function useSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState(null);
  const [error,      setError]      = useState(null);

  const submit = async ({ userId, testId, section, answers, timeTaken }) => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, testId, section, answers, timeTaken }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // ★ Already submitted — show message, don't crash
        setError(data.message);
        return null;
      }
      if (!res.ok) throw new Error(data.error);

      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, result, error };
}