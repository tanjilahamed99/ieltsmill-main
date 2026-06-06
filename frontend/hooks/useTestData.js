import { useState, useEffect } from "react";

export function useTestData(testId, section) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!testId || !section) return;
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${testId}/${section}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((d) => {
        setData(d.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [testId, section]);

  return { data, loading, error };
}
