// "use client";

// import { useState, useEffect } from "react";
// import {
//   Badge,
//   Btn,
//   Card,
//   CardBody,
//   CardHeader,
//   Toast,
// } from "../../components/Shared/AdminUi";
// import { AdminRoute } from "../../Providers/PrivateRoute";
// import ListeningTestCreator from "../../pages/admin/Listeningtestcreator";
// import ReadingTestCreator from "../../pages/admin/Readingtestcreator";
// import WritingTestCreator from "../../pages/admin/Writingtestcreator";
// import FullTestCreator from "../../pages/admin/Fulltestcreator";
// import { adminDeleteTest, adminTestList, adminGetTestOne, adminPublishTest } from "../../action/admin";

// const TEST_TYPES = [
//   {
//     key: "full-test",
//     label: "Full Mock Tests",
//     icon: "🏆",
//     color: "bg-red-50 border-red-200 text-red-700",
//     badge: "red",
//   },
//   {
//     key: "listening",
//     label: "Listening Tests",
//     icon: "🎧",
//     color: "bg-blue-50 border-blue-200 text-blue-700",
//     badge: "blue",
//   },
//   {
//     key: "reading",
//     label: "Reading Tests",
//     icon: "📖",
//     color: "bg-green-50 border-green-200 text-green-700",
//     badge: "green",
//   },
//   {
//     key: "writing",
//     label: "Writing Tests",
//     icon: "✍️",
//     color: "bg-orange-50 border-orange-200 text-orange-700",
//     badge: "orange",
//   },
// ];

// // ─── Test row in listing ──────────────────────────────────────────────────────
// const TestRow = ({ test, onPublish, onDelete, onEdit }) => (
//   <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
//     <div
//       className="w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0"
//       style={{
//         background: "linear-gradient(135deg,#7f0000,#EF4444)",
//         color: "white",
//         fontWeight: 900,
//       }}>
//       {test.testNumber}
//     </div>
//     <div className="flex-1 min-w-0">
//       <p className="text-sm font-semibold text-slate-800 truncate">
//         {test.title}
//       </p>
//       <p className="text-[11px] text-slate-400">
//         {test.seriesId} · {test.difficulty}
//       </p>
//     </div>
//     <div className="flex items-center gap-2 shrink-0">
//       <Badge color={test.isPublished ? "green" : "gray"}>
//         {test.isPublished ? "Published" : "Draft"}
//       </Badge>
//       {test.isFreeScoring && <Badge color="blue">Free</Badge>}
//       <span className="text-xs text-slate-400">
//         {test.totalAttempts || 0} attempts
//       </span>
//     </div>
//     <div className="flex items-center gap-1.5 shrink-0">
//       <button
//         onClick={onEdit}
//         className="text-xs px-2.5 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 transition-all">
//         Edit
//       </button>
//       <button
//         onClick={onPublish}
//         className="text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:scale-105"
//         style={
//           test.isPublished
//             ? { borderColor: "#E2E8F0", color: "#64748B" }
//             : { borderColor: "#10B981", color: "#10B981" }
//         }>
//         {test.isPublished ? "Unpublish" : "Publish"}
//       </button>
//       <button
//         onClick={onDelete}
//         className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-all">
//         Delete
//       </button>
//     </div>
//   </div>
// );

// // ─── Tests list panel ─────────────────────────────────────────────────────────
// const TestsList = ({ type, onCreateNew, onEdit }) => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [toast, setToast] = useState(null);
//   const [refetch, setRefetch] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const res = await adminTestList(type, page);
//         setTests(res.data.data || []);
//         setTotal(res.data.pagination?.total || 0);
//       } catch (error) {
//         console.error("Failed to load tests:", error);
//         setToast({ msg: "Failed to load tests", type: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (type) {
//       load();
//     }
//   }, [type, page, refetch]);

//   const handlePublish = async (test) => {
//     try {
//       // Assuming you have an adminPublishTest function
//       await adminPublishTest(type, test._id, !test.isPublished);
//       setToast({
//         msg: `Test ${test.isPublished ? "unpublished" : "published"}!`,
//         type: "success",
//       });
//       setRefetch(!refetch);
//     } catch (e) {
//       const error = e;
//       setToast({
//         msg:
//           error.message ||
//           error.response?.data?.message ||
//           "Failed to update test",
//         type: "error",
//       });
//     }
//   };

//   const handleDelete = async (test) => {
//     if (!confirm(`Delete "${test.title}"? This cannot be undone.`)) return;
//     try {
//       await adminDeleteTest(type, test._id);
//       setToast({ msg: "Test deleted", type: "success" });
//       setRefetch(!refetch);
//     } catch (e) {
//       const error = e;
//       setToast({
//         msg:
//           error.message ||
//           error.response?.data?.message ||
//           "Failed to delete test",
//         type: "error",
//       });
//     }
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader
//           title={`${TEST_TYPES.find((t) => t.key === type)?.label} (${total})`}
//           action={
//             <Btn variant="primary" size="sm" onClick={onCreateNew}>
//               + Create New
//             </Btn>
//           }
//         />
//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <div
//               className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
//               style={{ borderColor: "#EF4444", borderTopColor: "transparent" }}
//             />
//           </div>
//         ) : tests.length === 0 ? (
//           <CardBody>
//             <div className="text-center py-10">
//               <div className="text-4xl mb-3">
//                 {TEST_TYPES.find((t) => t.key === type)?.icon}
//               </div>
//               <p className="text-sm text-slate-500">No tests yet.</p>
//               <Btn
//                 variant="primary"
//                 size="sm"
//                 onClick={onCreateNew}
//                 className="mt-3">
//                 Create your first {type} test
//               </Btn>
//             </div>
//           </CardBody>
//         ) : (
//           <div>
//             {tests.map((t) => (
//               <TestRow
//                 key={t._id}
//                 test={t}
//                 type={type}
//                 onPublish={() => handlePublish(t)}
//                 onDelete={() => handleDelete(t)}
//                 onEdit={() => onEdit(t)}
//               />
//             ))}
//             {total > 10 && (
//               <div className="flex items-center justify-center gap-2 p-4">
//                 <Btn
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}>
//                   ←
//                 </Btn>
//                 <span className="text-xs text-slate-500">Page {page}</span>
//                 <Btn
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => setPage((p) => p + 1)}
//                   disabled={tests.length < 10}>
//                   →
//                 </Btn>
//               </div>
//             )}
//           </div>
//         )}
//       </Card>
//       {toast && (
//         <Toast
//           msg={toast.msg}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default function AdminTestsPage() {
//   const [view, setView] = useState("dashboard");
//   const [activeType, setActiveType] = useState("listening");
//   const [editingTest, setEditingTest] = useState(null);
//   const [loadingTest, setLoadingTest] = useState(false);

//   const goCreate = (type) => {
//     setActiveType(type);
//     setEditingTest(null);
//     setView(`create-${type}`);
//   };

//   const goEdit = async (test) => {
//     setLoadingTest(true);
//     try {
//       // Fetch full test data
//       const res = await adminGetTestOne(test.type || activeType, test._id);
//       setEditingTest(res.data.data);
//       setActiveType(test.type || activeType);
//       setView(`create-${test.type || activeType}`);
//     } catch (error) {
//       console.error("Failed to load test for editing:", error);
//       // Fallback: use the test data we have
//       setEditingTest(test);
//       setActiveType(test.type || activeType);
//       setView(`create-${test.type || activeType}`);
//     } finally {
//       setLoadingTest(false);
//     }
//   };

//   const goBack = () => {
//     setView("dashboard");
//     setEditingTest(null);
//   };

//   const handleSaved = () => {
//     setView("dashboard");
//     setEditingTest(null);
//   };

//   return (
//     <AdminRoute>
//       <div
//         className="min-h-screen bg-slate-50"
//         style={{
//           fontFamily: "'Plus Jakarta Sans','DM Sans',ui-sans-serif,sans-serif",
//         }}>
//         {/* ── Admin Topbar ── */}
//         <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {view !== "dashboard" && (
//                 <button
//                   onClick={goBack}
//                   className="text-slate-400 hover:text-slate-700 transition-colors mr-1">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                     viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 18l-6-6 6-6"
//                     />
//                   </svg>
//                 </button>
//               )}
//               <div
//                 className="w-8 h-8 rounded-lg flex items-center justify-center"
//                 style={{
//                   background: "linear-gradient(135deg,#EF4444,#F97316)",
//                 }}>
//                 <span className="text-white font-black text-sm">I</span>
//               </div>
//               <div>
//                 <span className="font-black text-slate-900">IELTSMILL</span>
//                 <span className="text-slate-300 mx-2">·</span>
//                 <span className="text-sm font-medium text-slate-500">
//                   {view === "dashboard"
//                     ? "Test Management"
//                     : editingTest
//                     ? `Edit ${activeType.charAt(0).toUpperCase() + activeType.slice(1)} Test`
//                     : `Create ${activeType.charAt(0).toUpperCase() + activeType.slice(1)} Test`}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Badge color="red">Admin</Badge>
//               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
//                 A
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
//           {/* ── DASHBOARD VIEW ── */}
//           {view === "dashboard" && (
//             <div className="space-y-8">
//               {/* Quick stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {TEST_TYPES.map((t) => (
//                   <button
//                     key={t.key}
//                     onClick={() => setActiveType(t.key)}
//                     className={`rounded-2xl border p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md ${t.color} ${activeType === t.key ? "ring-2 ring-offset-2 ring-red-400" : ""}`}>
//                     <div className="text-2xl mb-2">{t.icon}</div>
//                     <p className="text-sm font-bold">{t.label}</p>
//                     <p className="text-xs opacity-70 mt-0.5">Click to manage</p>
//                   </button>
//                 ))}
//               </div>

//               {/* Tabs for each test type */}
//               <div>
//                 <div className="flex gap-2 mb-5 overflow-x-auto">
//                   {TEST_TYPES.map((t) => (
//                     <button
//                       key={t.key}
//                       onClick={() => setActiveType(t.key)}
//                       className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
//                       style={
//                         activeType === t.key
//                           ? {
//                               background:
//                                 "linear-gradient(135deg,#EF4444,#F97316)",
//                               color: "white",
//                             }
//                           : {
//                               background: "white",
//                               color: "#64748B",
//                               border: "1px solid #E2E8F0",
//                             }
//                       }>
//                       {t.icon} {t.label}
//                     </button>
//                   ))}
//                 </div>

//                 <TestsList
//                   key={activeType}
//                   type={activeType}
//                   onCreateNew={() => goCreate(activeType)}
//                   onEdit={goEdit}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Loading state */}
//           {loadingTest && (
//             <div className="flex items-center justify-center py-12">
//               <div
//                 className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
//                 style={{ borderColor: "#EF4444", borderTopColor: "transparent" }}
//               />
//             </div>
//           )}

//           {/* ── CREATE/EDIT VIEWS ── */}
//           {view === "create-listening" && !loadingTest && (
//             <div>
//               <div className="mb-6">
//                 <h1 className="text-xl font-black text-slate-900">
//                   {editingTest ? "Edit" : "Create"} Listening Test
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">
//                   4 parts · 10 questions each · 40 minutes
//                 </p>
//               </div>
//               <ListeningTestCreator
//                 initial={editingTest}
//                 onSaved={handleSaved}
//               />
//             </div>
//           )}

//           {view === "create-reading" && !loadingTest && (
//             <div>
//               <div className="mb-6">
//                 <h1 className="text-xl font-black text-slate-900">
//                   {editingTest ? "Edit" : "Create"} Reading Test
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">
//                   3 passages · ~13 questions each · 60 minutes
//                 </p>
//               </div>
//               <ReadingTestCreator
//                 initial={editingTest}
//                 onSaved={handleSaved}
//               />
//             </div>
//           )}

//           {view === "create-writing" && !loadingTest && (
//             <div>
//               <div className="mb-6">
//                 <h1 className="text-xl font-black text-slate-900">
//                   {editingTest ? "Edit" : "Create"} Writing Test
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">
//                   Task 1 (20 min) + Task 2 (40 min) · 60 minutes total
//                 </p>
//               </div>
//               <WritingTestCreator
//                 initial={editingTest}
//                 onSaved={handleSaved}
//               />
//             </div>
//           )}

//           {view === "create-full-test" && !loadingTest && (
//             <div>
//               <div className="mb-6">
//                 <h1 className="text-xl font-black text-slate-900">
//                   {editingTest ? "Edit" : "Create"} Full Mock Test
//                 </h1>
//                 <p className="text-sm text-slate-500 mt-1">
//                   Bundle an existing Listening + Reading + Writing test into one
//                   Full Mock Test (~2h 45m)
//                 </p>
//               </div>
//               <FullTestCreator
//                 initial={editingTest}
//                 onSaved={handleSaved}
//               />
//             </div>
//           )}
//         </main>
//       </div>
//     </AdminRoute>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminTestList } from "../../action/admin";

// ── Mini stat card ──────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent, sub }) => (
  <div
    className="rounded-2xl p-5 relative overflow-hidden"
    style={{ background: "white", border: "1px solid #e5e7eb" }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black text-slate-900 mt-1">{value ?? "—"}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: `${accent}18` }}
      >
        {icon}
      </div>
    </div>
    {/* Decorative accent line */}
    <div
      className="absolute bottom-0 left-0 h-0.5 w-full"
      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
    />
  </div>
);

// ── Recent test row ─────────────────────────────────────────────────────────
const RecentRow = ({ test, type }) => {
  const colorMap = {
    listening: { bg: "#3b82f6", label: "Listening" },
    reading: { bg: "#10b981", label: "Reading" },
    writing: { bg: "#f97316", label: "Writing" },
    "full-test": { bg: "#ef4444", label: "Full Test" },
  };
  const c = colorMap[type] || { bg: "#6b7280", label: type };

  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0"
        style={{ background: c.bg }}
      >
        {test.testNumber}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{test.title}</p>
        <p className="text-[11px] text-slate-400">{c.label} · {test.difficulty || "—"}</p>
      </div>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={
          test.isPublished
            ? { background: "#d1fae5", color: "#065f46" }
            : { background: "#f1f5f9", color: "#64748b" }
        }
      >
        {test.isPublished ? "Live" : "Draft"}
      </span>
    </div>
  );
};

const TYPES = ["listening", "reading", "writing", "full-test"];

const QUICK_LINKS = [
  { href: "/admin/tests", label: "Manage Tests", icon: "📋", color: "#3b82f6" },
  { href: "/admin/self-practice", label: "Self Practice", icon: "📚", color: "#10b981" },
  { href: "/admin/tests?type=listening", label: "Add Listening Test", icon: "🎧", color: "#8b5cf6" },
  { href: "/admin/tests?type=reading", label: "Add Reading Test", icon: "📖", color: "#f59e0b" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled(
          TYPES.map((t) => adminTestList(t, 1))
        );

        const countMap = {};
        const recentAll = [];

        results.forEach((res, i) => {
          const type = TYPES[i];
          if (res.status === "fulfilled") {
            const data = res.value?.data;
            countMap[type] = data?.pagination?.total || data?.data?.length || 0;
            const items = (data?.data || []).slice(0, 3);
            items.forEach((item) => recentAll.push({ ...item, type }));
          } else {
            countMap[type] = 0;
          }
        });

        setCounts(countMap);
        setRecent(recentAll.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const totalTests = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden px-8 py-10"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#ef4444,transparent)" }} />
        <div className="absolute top-4 right-32 w-24 h-24 rounded-full opacity-5" style={{ background: "radial-gradient(circle,#f97316,transparent)" }} />

        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-semibold">Admin Dashboard</p>
        <h1 className="text-2xl font-black text-white mb-1">Welcome back 👋</h1>
        <p className="text-sm text-slate-400">Here's what's happening with your IELTS platform today.</p>
      </div>

      <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
        {/* ── Stats grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-white animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Tests" value={totalTests} icon="🏆" accent="#ef4444" sub="across all types" />
            <StatCard label="Listening" value={counts.listening} icon="🎧" accent="#3b82f6" sub="tests created" />
            <StatCard label="Reading" value={counts.reading} icon="📖" accent="#10b981" sub="tests created" />
            <StatCard label="Writing" value={counts.writing} icon="✍️" accent="#f97316" sub="tests created" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Recent tests ── */}
          <div
            className="lg:col-span-2 rounded-2xl bg-white p-6"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-black text-slate-900 text-base">Recent Tests</h2>
                <p className="text-xs text-slate-400 mt-0.5">Latest across all categories</p>
              </div>
              <Link
                href="/admin/tests"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "#fef2f2", color: "#ef4444" }}
              >
                View All →
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm text-slate-400">No tests created yet</p>
                <Link href="/admin/tests" className="text-xs text-red-500 font-semibold mt-2 inline-block">
                  Create your first test →
                </Link>
              </div>
            ) : (
              <div>
                {recent.map((t) => (
                  <RecentRow key={t._id} test={t} type={t.type} />
                ))}
              </div>
            )}
          </div>

          {/* ── Quick links ── */}
          <div
            className="rounded-2xl bg-white p-6 space-y-3"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <h2 className="font-black text-slate-900 text-base mb-1">Quick Actions</h2>
            <p className="text-xs text-slate-400 mb-4">Jump to any section</p>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{
                  background: `${link.color}0d`,
                  border: `1px solid ${link.color}22`,
                }}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-semibold" style={{ color: link.color }}>
                  {link.label}
                </span>
                <svg className="w-4 h-4 ml-auto opacity-50" style={{ color: link.color }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Type breakdown */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Breakdown</p>
              {[
                { label: "Full Mock Tests", key: "full-test", color: "#ef4444" },
                { label: "Listening", key: "listening", color: "#3b82f6" },
                { label: "Reading", key: "reading", color: "#10b981" },
                { label: "Writing", key: "writing", color: "#f97316" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{counts[item.key] ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}