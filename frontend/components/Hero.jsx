"use client";
import { Award, ArrowRight, CheckCircle } from "lucide-react";

const stats = [
  { number: "500+", label: "Students Enrolled", icon: "🎓" },
  { number: "95%", label: "Band 7+ Success", icon: "⭐" },
  { number: "30+", label: "Countries Guided", icon: "🌍" },
  { number: "8+", label: "Years Experience", icon: "🏆" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="grain"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #08101e 0%, #0f1f38 50%, #08101e 100%)",
      }}>
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,150,62,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Grid dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, #c8963e 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 24px 80px",
          width: "100%",
        }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="hero-grid">
          {/* Left */}
          <div>
            <div className="label-tag anim-up">
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c8963e",
                }}
              />
              Narsingdi&apos;s #1 IELTS Institute
            </div>

            <h1
              className="font-display anim-up delay-1"
              style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                lineHeight: 1.0,
                color: "white",
                fontWeight: 400,
                marginBottom: 24,
              }}>
              Achieve Your
              <br />
              <span className="gold-text">Dream Band</span>
              <br />
              Score
            </h1>

            <p
              className="anim-up delay-2"
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 480,
                marginBottom: 36,
              }}>
              Narsingdi&apos;s premier IELTS, TOEFL, PTE coaching center and
              study abroad consultancy. Expert-led classes, proven methods, real
              results.
            </p>

            <div
              className="anim-up delay-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 40,
              }}>
              {[
                "Expert IELTS, TOEFL & PTE Coaching",
                "Study Abroad Visa Counseling",
                "Spoken English & Communication",
                "Small Batch — Max 12 Students",
              ].map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.4,
                  }}>
                  <CheckCircle
                    size={15}
                    style={{ color: "#c8963e", flexShrink: 0, marginTop: 2 }}
                  />{" "}
                  {h}
                </div>
              ))}
            </div>

            <div
              className="anim-up delay-4"
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#contact" className="btn-gold">
                Book Free Demo Class <ArrowRight size={17} />
              </a>
              <a href="#courses" className="btn-ghost">
                Explore Courses
              </a>
            </div>
          </div>

          {/* Right card */}
          <div
            className="anim-up delay-3 hero-card-col"
            style={{ position: "relative" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(200,150,62,0.25)",
                borderRadius: 28,
                padding: 36,
                position: "relative",
                overflow: "hidden",
              }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(200,150,62,0.06) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />

              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  right: 28,
                  background: "linear-gradient(135deg, #be123c, #e11d48)",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(190,18,60,0.4)",
                }}>
                🔥 Admissions Open
              </div>

              <div style={{ position: "relative" }}>
                {/* Score */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 28,
                  }}>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.45)",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}>
                      Average Band Score
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: 72,
                        fontWeight: 400,
                        color: "white",
                        lineHeight: 1,
                      }}>
                      7.5
                      <span style={{ fontSize: 36, color: "#c8963e" }}>+</span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#c8963e",
                        fontWeight: 600,
                      }}>
                      Achieved by our students
                    </div>
                  </div>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #c8963e, #e8b96a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "pulse-glow 2.5s infinite",
                    }}>
                    <Award size={36} style={{ color: "#08101e" }} />
                  </div>
                </div>

                {/* Bars */}
                {[
                  { label: "Reading", score: 8.0, pct: 89 },
                  { label: "Listening", score: 8.5, pct: 95 },
                  { label: "Writing", score: 7.0, pct: 78 },
                  { label: "Speaking", score: 7.5, pct: 83 },
                ].map((s, i) => (
                  <div key={s.label} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}>
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.6)",
                          fontWeight: 500,
                        }}>
                        {s.label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#c8963e",
                          fontWeight: 700,
                        }}>
                        {s.score}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 4,
                          background: `linear-gradient(90deg, #c8963e, #e8b96a)`,
                          width: `${s.pct}%`,
                          transition: "width 1.5s ease",
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}

                {/* Testimonial mini */}
                <div
                  style={{
                    marginTop: 20,
                    padding: "16px 18px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                  }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} style={{ color: "#c8963e", fontSize: 13 }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.7)",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}>
                    &ldquo;Macron helped me achieve Band 8! The teachers are
                    incredible and classes are very focused.&rdquo;
                  </p>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#c8963e",
                      fontWeight: 700,
                      marginTop: 8,
                    }}>
                    — Rahim U., IELTS Band 8.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="anim-up delay-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,150,62,0.15)",
                borderRadius: 20,
                padding: "24px 20px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(200,150,62,0.08)";
                e.currentTarget.style.borderColor = "rgba(200,150,62,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(200,150,62,0.15)";
              }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div
                className="font-display"
                style={{ fontSize: 36, color: "white", marginBottom: 4 }}>
                {s.number}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L1440 80L1440 30C1100 80 600 0 0 35L0 80Z"
            fill="#faf7f2"
          />
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-card-col { display: none; }
        }
        @media (max-width: 640px) {
          .hero-grid > div:first-child > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
