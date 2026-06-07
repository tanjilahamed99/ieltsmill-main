"use client";

import {
  adminDeleteUser,
  adminGetAllUserData,
  adminUpdateUserStatus,
} from "../../../action/admin";
import { useState, useEffect } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const STATUS_CONFIG = {
  pending: {
    bg: "#fef9c3",
    color: "#854d0e",
    dot: "#eab308",
    label: "Pending",
  },
  approved: {
    bg: "#dcfce7",
    color: "#166534",
    dot: "#22c55e",
    label: "Approved",
  },
  rejected: {
    bg: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
    label: "Rejected",
  },
};

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#3b82f6)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#ef4444,#ec4899)",
];

function avatarGradient(id) {
  return AVATAR_GRADIENTS[id.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

// ─── Confirm Dialog ──────────────────────────────────────────────────────────
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmColor = "#ef4444",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div
        className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full"
        style={{ border: "1px solid #e5e7eb" }}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: `${confirmColor}18` }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={confirmColor}
            strokeWidth={2}
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <h3 className="font-black text-slate-900 text-center text-base mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100"
            style={{ border: "1px solid #e5e7eb" }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: confirmColor }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── User Row ────────────────────────────────────────────────────────────────
function UserRow({ user, onApprove, onReject, onDelete }) {
  const sc = STATUS_CONFIG[user.status] || STATUS_CONFIG.pending;

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors group">
      {/* User */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm"
            style={{ background: avatarGradient(user._id) }}>
            {getInitials(user.name)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user.name}
            </p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: sc.bg, color: sc.color }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: sc.dot }}
          />
          {sc.label}
        </span>
      </td>

      {/* Joined */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <p className="text-xs text-slate-500">{formatDate(user.createdAt)}</p>
      </td>

      {/* Tests */}
      <td className="py-3.5 px-4 hidden md:table-cell">
        <p className="text-xs font-bold text-slate-700">
          {user.testsAttempted}
        </p>
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2 justify-end">
          {user.status === "pending" && (
            <>
              <button
                onClick={() => onApprove(user._id)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                style={{ background: "#dcfce7", color: "#166534" }}>
                Approve
              </button>
              <button
                onClick={() => onReject(user._id)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                style={{ background: "#fee2e2", color: "#991b1b" }}>
                Reject
              </button>
            </>
          )}
          {user.status === "rejected" && (
            <button
              onClick={() => onApprove(user._id)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: "#dcfce7", color: "#166534" }}>
              Approve
            </button>
          )}
          {user.status === "approved" && (
            <button
              onClick={() => onReject(user._id)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              style={{ background: "#f1f5f9", color: "#64748b" }}>
              Revoke
            </button>
          )}

          {/* Delete */}
          <button
            onClick={() => onDelete(user._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-105 opacity-0 group-hover:opacity-100"
            style={{ background: "#fee2e2", color: "#ef4444" }}
            title="Delete user">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pending | approved | rejected
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null); // { type, userId }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const { data } = await adminGetAllUserData();
      if (data.success) {
        setUsers(data.users);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // ── Derived stats ──
  const stats = {
    total: users.length,
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    rejected: users.filter((u) => u.status === "rejected").length,
  };

  // ── Filtered list ──
  const visible = users.filter((u) => {
    const matchFilter = filter === "all" || u.status === filter;
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  // ── Handlers ──
  const handleApprove = async (userId) => {
    setConfirm({ type: "approve", userId });
  };

  const handleReject = async (userId) => {
    setConfirm({ type: "reject", userId });
  };

  const handleDelete = (userId) => setConfirm({ type: "delete", userId });

  const executeConfirm = async () => {
    if (!confirm) return;
    const { type, userId } = confirm;

    if (type === "delete") {
      try {
        const { data } = await adminDeleteUser(userId);
        if (data.success) {
          setUsers((prev) => prev.filter((u) => u._id !== userId));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const newStatus = type === "approve" ? "approved" : "rejected";
      try {
        const { data } = await adminUpdateUserStatus(userId, newStatus);
        if (data.success) {
          setUsers((prev) =>
            prev.map((u) =>
              u._id === userId ? { ...u, status: newStatus } : u,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    setConfirm(null);
  };

  const FILTERS = [
    { key: "all", label: "All Users", count: stats.total },
    {
      key: "pending",
      label: "Pending",
      count: stats.pending,
      color: "#eab308",
    },
    {
      key: "approved",
      label: "Approved",
      count: stats.approved,
      color: "#22c55e",
    },
    {
      key: "rejected",
      label: "Rejected",
      count: stats.rejected,
      color: "#ef4444",
    },
  ];

  const confirmConfig = {
    approve: {
      title: "Approve this user?",
      message: "They will gain full access to the platform.",
      confirmLabel: "Yes, Approve",
      confirmColor: "#22c55e",
    },
    reject: {
      title: "Reject this user?",
      message: "Their access will be revoked or denied.",
      confirmLabel: "Yes, Reject",
      confirmColor: "#ef4444",
    },
    delete: {
      title: "Delete this user?",
      message: "This action is permanent and cannot be undone.",
      confirmLabel: "Delete",
      confirmColor: "#ef4444",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Confirm Dialog ── */}
      {confirm && (
        <ConfirmDialog
          open={true}
          {...confirmConfig[confirm.type]}
          onConfirm={executeConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden px-8 py-10"
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
        }}>
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#6366f1,transparent)" }}
        />
        <div
          className="absolute top-4 right-32 w-24 h-24 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle,#8b5cf6,transparent)" }}
        />

        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-semibold">
          Admin · Users
        </p>
        <h1 className="text-2xl font-black text-white mb-1">User Management</h1>
        <p className="text-sm text-slate-400">
          Approve, reject, or remove users from the platform.
        </p>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-3 mt-5">
          {[
            { label: "Total", value: stats.total, color: "#6366f1" },
            { label: "Pending", value: stats.pending, color: "#eab308" },
            { label: "Approved", value: stats.approved, color: "#22c55e" },
            { label: "Rejected", value: stats.rejected, color: "#ef4444" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{
                background: `${s.color}18`,
                border: `1px solid ${s.color}30`,
              }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: s.color }}
              />
              <span className="text-xs font-bold" style={{ color: s.color }}>
                {s.value} {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-8 py-8 max-w-6xl mx-auto">
        <div
          className="rounded-2xl bg-white overflow-hidden"
          style={{ border: "1px solid #e5e7eb" }}>
          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Filter tabs */}
            <div
              className="flex gap-1 p-1 rounded-xl"
              style={{ background: "#f1f5f9" }}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={
                    filter === f.key
                      ? {
                          background: "white",
                          color: "#0f172a",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        }
                      : { color: "#64748b" }
                  }>
                  {f.label}
                  {f.count > 0 && (
                    <span
                      className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]"
                      style={
                        filter === f.key && f.color
                          ? { background: `${f.color}18`, color: f.color }
                          : { background: "#e2e8f0", color: "#64748b" }
                      }>
                      {f.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  width: 220,
                  color: "#0f172a",
                }}
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">👥</p>
              <p className="text-sm font-semibold text-slate-500">
                No users found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "#f8fafc",
                      borderBottom: "1px solid #e5e7eb",
                    }}>
                    <th className="text-left py-3 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-black text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                      Joined
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-black text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((user) => (
                    <UserRow
                      key={user._id}
                      user={user}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer count */}
          {!loading && visible.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-600">
                  {visible.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-600">{users.length}</span>{" "}
                users
              </p>
              {stats.pending > 0 && (
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full animate-pulse"
                  style={{ background: "#fef9c3", color: "#854d0e" }}>
                  ⏳ {stats.pending} awaiting approval
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
