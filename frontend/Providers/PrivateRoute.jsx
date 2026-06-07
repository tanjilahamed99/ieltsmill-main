// components/PrivateRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { myData } from "../action/auth";
import Link from "next/link";

const PendingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
    <h1 className="text-3xl font-bold text-yellow-500 mb-3">Account Pending</h1>

    <p className="text-gray-600 max-w-md">
      Your account is currently under review. Please wait for admin approval.
    </p>
    <Link
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      href="/">
      Go to Home
    </Link>
  </div>
);

const RejectedPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
    <h1 className="text-3xl font-bold text-red-500 mb-3">Account Rejected</h1>

    <p className="text-gray-600 max-w-md">
      Your account request has been rejected. Please contact support for more
      information.
    </p>
    <Link
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      href="/">
      Go to Home
    </Link>
  </div>
);

const PrivateRoute = ({ children, allowedRoles }) => {
  const [user, setuser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await myData();
      setuser(data);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // WAIT AUTH LOADING
    if (isLoading) return;

    // NO USER
    if (!user) {
      router.push("/login");
      return;
    }

    // USER STATUS
    const userStatus = user?.status;

    // PENDING
    if (userStatus === "pending") {
      return;
    }

    // REJECTED
    if (userStatus === "rejected") {
      return;
    }

    // ROLE CHECK
    const userRole = user?.role || "user";

    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

      return;
    }

    // APPROVED
    setIsAuthorized(true);
  }, [user, allowedRoles, router, isLoading]);

  // LOADING
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // USER STATUS UI
  if (user?.status === "pending") {
    return <PendingPage />;
  }

  if (user?.status === "rejected") {
    return <RejectedPage />;
  }

  // WAIT AUTH
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

// ROLE WRAPPERS
export const AdminRoute = ({ children }) => (
  <PrivateRoute allowedRoles={["admin"]}>{children}</PrivateRoute>
);

export const UserRoute = ({ children }) => (
  <PrivateRoute allowedRoles={["user"]}>{children}</PrivateRoute>
);

export default PrivateRoute;
