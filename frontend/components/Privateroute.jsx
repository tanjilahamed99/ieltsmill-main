"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/Useauthstore";

/**
 * Usage:
 *
 * <PrivateRoute>               → any logged-in user
 * <PrivateRoute role="admin">  → admin only
 * <PrivateRoute role="user">   → regular user only
 */
export default function PrivateRoute({ children, role = null }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  // ── Hydration guard ──────────────────────────────────────────
  // Zustand persist rehydrates from localStorage asynchronously.
  // On first render token is always null — wait until hydration
  // is complete before making any redirect decision.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // If already hydrated (e.g. navigating between pages), set immediately
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    // Otherwise wait for hydration to finish
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't redirect until localStorage is read

    // 1. Not logged in → go to login
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    // 2. Admin visiting a user-only route → send to admin panel
    if (role === "user" && user.role === "admin") {
      router.replace("/admin");
      return;
    }

    // 3. User visiting an admin-only route → send to dashboard
    if (role === "admin" && user.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
  }, [hydrated, token, user, role, router]);

  // Waiting for localStorage to load — render nothing (avoids flash)
  if (!hydrated) return null;

  // About to redirect — render nothing
  if (!token || !user) return null;
  if (role === "admin" && user.role !== "admin") return null;
  if (role === "user" && user.role === "admin") return null;

  return children;
}
