"use client";

import { useState, useEffect } from "react";
import {
  Badge,
  Btn,
  Card,
  CardBody,
  CardHeader,
  Toast,
} from "../../../components/Shared/AdminUi";
import {
  adminDeleteTest,
  adminTestList,
  adminGetTestOne,
  adminPublishTest,
} from "../../../action/admin";
import ListeningTestCreator from "../../../pages/admin/Listeningtestcreator";
import ReadingTestCreator from "../../../pages/admin/Readingtestcreator";
import WritingTestCreator from "../../../pages/admin/Writingtestcreator";
import FullTestCreator from "../../../pages/admin/Fulltestcreator";

const TEST_TYPES = [
  { key: "full-test", label: "Full Mock Tests", icon: "🏆", accent: "#ef4444" },
  { key: "listening", label: "Listening", icon: "🎧", accent: "#3b82f6" },
  { key: "reading", label: "Reading", icon: "📖", accent: "#10b981" },
  { key: "writing", label: "Writing", icon: "✍️", accent: "#f97316" },
];

// ── Page header bar ──────────────────────────────────────────────────────────
const PageHeader = ({ title, subtitle, action }) => (
  <div
    className="px-8 py-7 flex items-center justify-between"
    style={{
      background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5 font-semibold">
        Test Management
      </p>
      <h1 className="text-xl font-black text-white">{title}</h1>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ── Test row ─────────────────────────────────────────────────────────────────
const TestRow = ({ test, onPublish, onDelete, onEdit, accent }) => (
  <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 text-white font-black"
      style={{ background: accent }}
    >
      {test.testNumber}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-800 truncate">{test.title}</p>
      <p className="text-[11px] text-slate-400">
        {test.seriesId} · {test.difficulty}
      </p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <span
        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
        style={
          test.isPublished
            ? { background: "#d1fae5", color: "#065f46" }
            : { background: "#f1f5f9", color: "#64748b" }
        }
      >
        {test.isPublished ? "Published" : "Draft"}
      </span>
      {test.isFreeScoring && (
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
          Free
        </span>
      )}
      <span className="text-xs text-slate-400">{test.totalAttempts || 0} attempts</span>
    </div>
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={onEdit}
        className="text-xs px-2.5 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 transition-all font-medium"
      >
        Edit
      </button>
      <button
        onClick={onPublish}
        className="text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium"
        style={
          test.isPublished
            ? { borderColor: "#e2e8f0", color: "#64748b" }
            : { borderColor: "#10b981", color: "#10b981" }
        }
      >
        {test.isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={onDelete}
        className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-all font-medium"
      >
        Delete
      </button>
    </div>
  </div>
);

// ── Tests list for one type ──────────────────────────────────────────────────
const TestsList = ({ type, onCreateNew, onEdit }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const typeInfo = TEST_TYPES.find((t) => t.key === type);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await adminTestList(type, page);
        setTests(res.data.data || []);
        setTotal(res.data.pagination?.total || 0);
      } catch {
        setToast({ msg: "Failed to load tests", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    if (type) load();
  }, [type, page, refetch]);

  const handlePublish = async (test) => {
    try {
      await adminPublishTest(type, test._id, !test.isPublished);
      setToast({ msg: `Test ${test.isPublished ? "unpublished" : "published"}!`, type: "success" });
      setRefetch((r) => !r);
    } catch (e) {
      setToast({ msg: e?.response?.data?.message || "Failed to update", type: "error" });
    }
  };

  const handleDelete = async (test) => {
    if (!confirm(`Delete "${test.title}"? This cannot be undone.`)) return;
    try {
      await adminDeleteTest(type, test._id);
      setToast({ msg: "Test deleted", type: "success" });
      setRefetch((r) => !r);
    } catch (e) {
      setToast({ msg: e?.response?.data?.message || "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeInfo?.icon}</span>
          <div>
            <h3 className="font-black text-slate-900 text-sm">{typeInfo?.label}</h3>
            <p className="text-[11px] text-slate-400">{total} tests total</p>
          </div>
        </div>
        <button
          onClick={onCreateNew}
          className="text-xs font-semibold px-4 py-2 rounded-xl text-white transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg,${typeInfo?.accent},${typeInfo?.accent}cc)` }}
        >
          + Create New
        </button>
      </div>

      <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: typeInfo?.accent, borderTopColor: "transparent" }}
            />
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">{typeInfo?.icon}</div>
            <p className="text-sm text-slate-500 mb-3">No {typeInfo?.label} tests yet.</p>
            <button
              onClick={onCreateNew}
              className="text-xs font-semibold px-4 py-2 rounded-xl text-white"
              style={{ background: typeInfo?.accent }}
            >
              Create your first {typeInfo?.label} test
            </button>
          </div>
        ) : (
          <>
            {tests.map((t) => (
              <TestRow
                key={t._id}
                test={t}
                accent={typeInfo?.accent}
                onPublish={() => handlePublish(t)}
                onDelete={() => handleDelete(t)}
                onEdit={() => onEdit(t)}
              />
            ))}
            {total > 10 && (
              <div className="flex items-center justify-center gap-3 p-4 border-t border-slate-100">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs text-slate-400">Page {page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={tests.length < 10}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

// ── Main Tests Page ──────────────────────────────────────────────────────────
export default function AdminTestsPage() {
  const [view, setView] = useState("list");
  const [activeType, setActiveType] = useState("listening");
  const [editingTest, setEditingTest] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);

  const goCreate = (type) => {
    setActiveType(type);
    setEditingTest(null);
    setView("editor");
  };

  const goEdit = async (test) => {
    setLoadingTest(true);
    try {
      const res = await adminGetTestOne(test.type || activeType, test._id);
      setEditingTest(res.data.data);
      setActiveType(test.type || activeType);
      setView("editor");
    } catch {
      setEditingTest(test);
      setActiveType(test.type || activeType);
      setView("editor");
    } finally {
      setLoadingTest(false);
    }
  };

  const goBack = () => {
    setView("list");
    setEditingTest(null);
  };

  const handleSaved = () => {
    setView("list");
    setEditingTest(null);
  };

  const activeInfo = TEST_TYPES.find((t) => t.key === activeType);

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader
        title={
          view === "editor"
            ? `${editingTest ? "Edit" : "Create"} ${activeInfo?.label} Test`
            : "Test Management"
        }
        subtitle={
          view === "editor"
            ? undefined
            : "Create and manage all your IELTS tests"
        }
        action={
          view === "editor" ? (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
              Back to Tests
            </button>
          ) : null
        }
      />

      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <div className="space-y-8">
            {/* Type tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TEST_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveType(t.key)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                  style={
                    activeType === t.key
                      ? { background: t.accent, color: "white" }
                      : { background: "white", color: "#64748b", border: "1px solid #e5e7eb" }
                  }
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            <TestsList
              key={activeType}
              type={activeType}
              onCreateNew={() => goCreate(activeType)}
              onEdit={goEdit}
            />
          </div>
        )}

        {/* ── EDITOR VIEW ── */}
        {view === "editor" && (
          <>
            {loadingTest ? (
              <div className="flex items-center justify-center py-20">
                <div
                  className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: activeInfo?.accent, borderTopColor: "transparent" }}
                />
              </div>
            ) : (
              <>
                {activeType === "listening" && (
                  <ListeningTestCreator initial={editingTest} onSaved={handleSaved} />
                )}
                {activeType === "reading" && (
                  <ReadingTestCreator initial={editingTest} onSaved={handleSaved} />
                )}
                {activeType === "writing" && (
                  <WritingTestCreator initial={editingTest} onSaved={handleSaved} />
                )}
                {activeType === "full-test" && (
                  <FullTestCreator initial={editingTest} onSaved={handleSaved} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}