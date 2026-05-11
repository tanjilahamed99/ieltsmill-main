"use client";

// pages/self-practice/index.jsx
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import { selfPracticeList } from "../../action/student";
const Footer = dynamic(() => import("../../components/Footer/Footer"));

// Mock API fetch — replace with your real fetch
const fetchPractices = async (type) => {
  const { data: reading } = await selfPracticeList("reading", 1);
  const { data: writing } = await selfPracticeList("writing", 1);

  // const reading = [
  //   {
  //     id: "1",
  //     title: "Climate Change & Global Impact",
  //     level: "Academic",
  //     time: 20,
  //     questions: 13,
  //     category: "Environment",
  //   },
  //   {
  //     id: "2",
  //     title: "The History of the Internet",
  //     level: "General",
  //     time: 20,
  //     questions: 14,
  //     category: "Technology",
  //   },
  //   {
  //     id: "3",
  //     title: "Urban Migration Patterns",
  //     level: "Academic",
  //     time: 20,
  //     questions: 13,
  //     category: "Society",
  //   },
  //   {
  //     id: "4",
  //     title: "Artificial Intelligence in Medicine",
  //     level: "Academic",
  //     time: 20,
  //     questions: 14,
  //     category: "Science",
  //   },
  //   {
  //     id: "5",
  //     title: "The Psychology of Habit Formation",
  //     level: "General",
  //     time: 20,
  //     questions: 13,
  //     category: "Psychology",
  //   },
  //   {
  //     id: "6",
  //     title: "Renewable Energy Sources",
  //     level: "Academic",
  //     time: 20,
  //     questions: 14,
  //     category: "Environment",
  //   },
  // ];
  // const writing = [
  //   {
  //     id: "1",
  //     title: "Bar Chart: Global Energy Consumption",
  //     level: "Task 1",
  //     time: 20,
  //     words: 150,
  //     category: "Charts",
  //   },
  //   {
  //     id: "2",
  //     title: "Discuss Both Views: Remote Work",
  //     level: "Task 2",
  //     time: 40,
  //     words: 250,
  //     category: "Opinion",
  //   },
  //   {
  //     id: "3",
  //     title: "Line Graph: Population Growth",
  //     level: "Task 1",
  //     time: 20,
  //     words: 150,
  //     category: "Graphs",
  //   },
  //   {
  //     id: "4",
  //     title: "Problem & Solution: Traffic Congestion",
  //     level: "Task 2",
  //     time: 40,
  //     words: 250,
  //     category: "Problem",
  //   },
  //   {
  //     id: "5",
  //     title: "Map Comparison: City Development",
  //     level: "Task 1",
  //     time: 20,
  //     words: 150,
  //     category: "Maps",
  //   },
  //   {
  //     id: "6",
  //     title: "Agree or Disagree: Technology in Education",
  //     level: "Task 2",
  //     time: 40,
  //     words: 250,
  //     category: "Opinion",
  //   },
  // ];
  return type === "reading" ? reading : writing;
};

const LEVEL_COLORS = {
  Academic: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  General: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "Task 1": { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "Task 2": { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF" },
};

const BookIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const PenIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function PracticeCard({ item, type }) {
  const levelStyle = LEVEL_COLORS[item.level] || {
    bg: "#F9FAFB",
    text: "#374151",
    border: "#E5E7EB",
  };
  return (
    <Link
      href={`/self-practice/${type}/${item._id}`}
      style={{ textDecoration: "none" }}>
      <div className="practice-card">
        <div className="card-top">
          <span className="category-badge">{item.category}</span>
          <span
            className="level-badge"
            style={{
              background: levelStyle.bg,
              color: levelStyle.text,
              border: `1px solid ${levelStyle.border}`,
            }}>
            {item.level}
          </span>
        </div>
        <h3 className="card-title">{item.title}</h3>
        <div className="card-meta">
          <span className="meta-item">
            <ClockIcon /> {item.time} min
          </span>
          {type === "writing" && (
            <span className="meta-item">✍️ {item.words}+ words</span>
          )}
        </div>
        <div className="card-footer">
          <span className="start-btn">
            Start Practice <ChevronRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PracticeSection({ type, icon, title, color, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPractices(type);
      setLoading(false);
      setItems(data.data);
    };
    fetch();
  }, [type]);

  return (
    <section className="practice-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <span
            className="section-icon"
            style={{ background: color + "18", color }}>
            {icon}
          </span>
          <div>
            <h2 className="section-title" style={{ color }}>
              {title}
            </h2>
            <p className="section-desc">{description}</p>
          </div>
        </div>
        <Link href={`/self-practice/${type}`} className="view-all">
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="cards-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="cards-grid">
          {items.map((item, idx) => (
            <PracticeCard key={idx} item={item} type={type} />
          ))}
        </div>
      )}
    </section>
  );
}

const SelfPractice = () => {
  return (
    <div className="sp-root">
      <Navbar />
      <main className="sp-main">
        {/* Hero */}
        <div className="sp-hero">
          <div className="hero-badge">IELTS Preparation</div>
          <h1 className="hero-title">Self Practice</h1>
          <p className="hero-subtitle">
            Sharpen your IELTS skills with curated reading passages and writing
            tasks.
            <br />
            Track your progress and build exam confidence.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">120+</span>
              <span className="stat-label">Passages</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">80+</span>
              <span className="stat-label">Writing Tasks</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">Free</span>
              <span className="stat-label">Access</span>
            </div>
          </div>
        </div>

        <div className="sp-content">
          <PracticeSection
            type="reading"
            icon={<BookIcon />}
            title="Reading"
            color="#1D4ED8"
            description="Academic & General Training passages with comprehension questions"
          />
          <PracticeSection
            type="writing"
            icon={<PenIcon />}
            title="Writing"
            color="#7E22CE"
            description="Task 1 & Task 2 prompts with model answers and evaluation criteria"
          />
        </div>
      </main>
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sp-root { font-family: 'DM Sans', sans-serif; background: #F8FAFC; min-height: 100vh; }

        /* HERO */
        .sp-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%);
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.2) 0%, transparent 70%);
        }
        .hero-badge {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #93C5FD;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .hero-title {
          font-family: 'Lora', serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          position: relative;
        }
        .hero-subtitle {
          color: #94A3B8;
          font-size: clamp(15px, 2.5vw, 18px);
          max-width: 540px;
          margin: 0 auto 36px;
          line-height: 1.7;
          position: relative;
        }
        .hero-stats {
          display: inline-flex;
          align-items: center;
          gap: 32px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 20px 40px;
          position: relative;
        }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 26px; font-weight: 700; color: #fff; font-family: 'Lora', serif; }
        .stat-label { font-size: 12px; color: #94A3B8; font-weight: 500; letter-spacing: 0.5px; }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }

        /* CONTENT */
        .sp-content { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }

        .practice-section { margin-bottom: 64px; }

        .section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .section-title-wrap { display: flex; align-items: center; gap: 16px; }
        .section-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .section-title {
          font-family: 'Lora', serif;
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .section-desc { color: #64748B; font-size: 14px; margin: 0; }
        .view-all {
          color: #1D4ED8;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 0;
          white-space: nowrap;
        }
        .view-all:hover { text-decoration: underline; }

        /* CARDS */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .practice-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 22px;
          cursor: pointer;
          transition: all 0.22s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .practice-card:hover {
          border-color: #1D4ED8;
          box-shadow: 0 8px 30px rgba(29,78,216,0.12);
          transform: translateY(-2px);
        }

        .card-top { display: flex; align-items: center; justify-content: space-between; }
        .category-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #64748B;
          background: #F1F5F9;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .level-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .card-title {
          font-family: 'Lora', serif;
          font-size: 16px;
          font-weight: 600;
          color: #0F172A;
          margin: 0;
          line-height: 1.4;
        }

        .card-meta { display: flex; gap: 16px; }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #64748B;
          font-weight: 500;
        }

        .card-footer { margin-top: auto; padding-top: 4px; border-top: 1px solid #F1F5F9; }
        .start-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: #1D4ED8;
        }

        /* SKELETON */
        .skeleton-card {
          background: #fff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          height: 160px;
          animation: shimmer 1.5s infinite;
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .sp-hero { padding: 60px 16px 44px; }
          .hero-stats { padding: 16px 20px; gap: 20px; }
          .sp-content { padding: 40px 16px 60px; }
          .cards-grid { grid-template-columns: 1fr; }
          .section-header { flex-direction: column; }
          .stat-num { font-size: 22px; }
        }
      `}</style>
    </div>
  );
};

export default SelfPractice;
