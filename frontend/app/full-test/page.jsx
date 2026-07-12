"use client";

import Link from "next/link";
import { UserRoute } from "../../Providers/PrivateRoute";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

// ─── Icons ────────────────────────────────────────────────────────────────
const ChevronRight = () => (
  <svg
    className="w-4 h-4 text-gray-300 absolute top-4 right-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
    />
    <circle cx="9" cy="7" r="4" />
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);
const BarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="9" width="3" height="6" rx="0.5" fill="#F59E0B" />
    <rect x="6" y="5" width="3" height="10" rx="0.5" fill="#F59E0B" />
    <rect x="11" y="2" width="3" height="13" rx="0.5" fill="#F59E0B" />
  </svg>
);

// ─── Static full test list ───────────────────────────────────────────────
// Replace/extend this array (or wire it back up to an API later) — id is
// what's used to build the link, e.g. id: 1 → /full-test/1
const FULL_TESTS = [
  {
    id: 1,
    name: "IELTS Full Test 01",
    difficulty: "Medium",
    participants: 3210,
    duration: "2h 45m",
  },
  {
    id: 2,
    name: "IELTS Full Test 02",
    difficulty: "Hard",
    participants: 2894,
    duration: "2h 45m",
  },
  {
    id: 3,
    name: "IELTS Full Test 03",
    difficulty: "Easy",
    participants: 4120,
    duration: "2h 45m",
  },
  {
    id: 4,
    name: "IELTS Full Test 04",
    difficulty: "Medium",
    participants: 1875,
    duration: "2h 45m",
  },
  {
    id: 5,
    name: "IELTS Full Test 05",
    difficulty: "Medium",
    participants: 2650,
    duration: "2h 45m",
  },
];

// ─── Full Test Card ───────────────────────────────────────────────────────
const FullTestCard = ({ test }) => (
  <Link href={`/full-test/${test.id}`} className="block group">
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all relative">
  

      <ChevronRight />

      <div className="mt-1 pr-5">
        <p
          className="text-sm font-bold mb-3 group-hover:text-red-600 transition"
          style={{ color: "#1A1A2E", fontFamily: "'Sora',sans-serif" }}>
          {test.name}
        </p>

        <div className="mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-semibold"
            style={{ fontFamily: "'Sora',sans-serif" }}>
            <ClockIcon /> {test.duration} · Full Test
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <BarIcon /> {test.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <UserIcon /> {test.participants.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon /> {test.duration}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// ─── Page ───────────────────────────────────────────────────────────────
export default function MockTestPage() {
  return (
    <UserRoute>
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F7F8FC" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>

        <main className="max-w-5xl mx-auto px-3 sm:px-5 py-6 sm:py-8">
          <div className="mb-6">
            <h1
              className="text-xl font-bold"
              style={{
                color: "#0F0F13",
                fontFamily: "'Sora',sans-serif",
                letterSpacing: "-0.3px",
              }}>
              IELTS Full Tests
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Choose a full test and start practising today
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FULL_TESTS.map((test) => (
              <FullTestCard key={test.id} test={test} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </UserRoute>
  );
}
