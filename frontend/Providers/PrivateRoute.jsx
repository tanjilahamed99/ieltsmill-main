// components/PrivateRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../features/Store";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) {
      return;
    }

    // Check if user exists - if not, redirect to login
    if (!user) {
      router.push("/login");
      return;
    }

    // Get user role (fallback to "user" if not defined)
    const userRole = user?.role || "user";

    // Check if user has allowed role
    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate page based on role
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      return;
    }

    // User is authorized
    setIsAuthorized(true);
  }, [user, allowedRoles, router, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Don't render children until authorized
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

// Simple role-based wrappers
export const AdminRoute = ({ children }) => (
  <PrivateRoute allowedRoles={["admin"]}>{children}</PrivateRoute>
);

export const UserRoute = ({ children }) => (
  <PrivateRoute allowedRoles={["user"]}>{children}</PrivateRoute>
);

export default PrivateRoute;
