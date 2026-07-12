'use client';
import { Star, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

const courses = [
  {
    icon: '🎯', title: 'IELTS Academic', subtitle: 'University Admission',
    rating: 4.9, reviews: 120, duration: '8 Weeks', batch: '12 Students',
    price: '৳8,000', accent: '#2563eb', tag: 'Most Popular',
    features: ['4 Skills Coverage', 'Mock Tests Weekly', 'Band Guarantee*', 'Study Material'],
  },
  {
    icon: '✈️', title: 'IELTS General', subtitle: 'PR / Work / Migration',
    rating: 4.8, reviews: 89, duration: '6 Weeks', batch: '12 Students',
    price: '৳7,000', accent: '#059669', tag: null,
    features: ['Task 1 & 2 Writing', 'Speaking Practice', 'Listening Drills', 'Full Mock Test'],
  },
  {
    icon: '🌍', title: 'TOEFL iBT', subtitle: 'US / Canada Universities',
    rating: 4.8, reviews: 45, duration: '8 Weeks', batch: '10 Students',
    price: '৳9,000', accent: '#d97706', tag: 'New Batch',
    features: ['Integrated Tasks', 'Computer-Based Practice', 'Score Guarantee*', 'Study Material'],
  },
  {
    icon: '💎', title: 'PTE Academic', subtitle: 'Australia / NZ / UK',
    rating: 4.7, reviews: 60, duration: '6 Weeks', batch: '10 Students',
    price: '৳8,500', accent: '#7c3aed', tag: null,
    features: ['AI-Scored Practice', 'Fast Track Option', 'Templates Provided', 'Online Support'],
  },
  {
    icon: '🏥', title: 'OET', subtitle: 'Healthcare Professionals',
    rating: 4.9, reviews: 30, duration: '6 Weeks', batch: '8 Students',
    price: '৳10,000', accent: '#be123c', tag: 'Specialized',
    features: ['Profession-Specific', 'Letter Writing Focus', 'Role Play Practice', 'Case Notes'],
  },
  {
    icon: '🗣️', title: 'Spoken English', subtitle: 'Fluency & Confidence',
    rating: 4.8, reviews: 200, duration: '3 Months', batch: '15 Students',
    price: '৳4,000', accent: '#c8963e', tag: 'Bestseller',
    features: ['Daily Conversation', 'Pronunciation Drills', 'Group Activities', 'Video Sessions'],
  },
];

export default function Courses() {
  return (
    <section id="courses" style={{ padding: '100px 0', background: '#faf7f2' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', marginBottom: 64, gap: 32 }} className="courses-header">
          <div>
            <div className="label-tag">Our Programs</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 58px)', color: '#08101e', lineHeight: 1.1 }}>
              Band Guarantee<br /><span className="gold-text">Programs</span>
            </h2>
            <div className="divider-gold" />
            <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
              Choose your path to global opportunities. Each course is crafted for maximum score improvement with our Band Guarantee promise.
            </p>
          </div>
          {/* Guarantee pill */}
          <div style={{
            background: 'linear-gradient(135deg, #08101e, #0f1f38)',
            borderRadius: 20, padding: '24px 28px',
            border: '1px solid rgba(200,150,62,0.25)',
            maxWidth: 280,
          }} className="guarantee-box">
            <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 6 }}>Band Score Guarantee</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 14 }}>
              Miss your target? Repeat the course FREE.
            </div>
            <a href="#contact" className="btn-gold" style={{ padding: '10px 20px', fontSize: 13 }}>
              Claim Now <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="courses-grid">
          {courses.map(c => (
            <div key={c.title} className="card-lift" style={{
              background: 'white',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid #e8e2d9',
              position: 'relative',
            }}>
              {/* Accent top bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${c.accent}, ${c.accent}88)` }} />

              {c.tag && (
                <div style={{
                  position: 'absolute', top: 20, right: 16,
                  background: c.accent, color: 'white',
                  fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100,
                }}>
                  {c.tag}
                </div>
              )}

              <div style={{ padding: '28px 28px 24px' }}>
                {/* Icon + title */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                    background: `${c.accent}14`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 20, color: '#08101e', marginBottom: 4 }}>{c.title}</h3>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{c.subtitle}</div>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={12} style={i <= Math.floor(c.rating) ? { fill: '#f59e0b', color: '#f59e0b' } : { color: '#e2e8f0' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#08101e' }}>{c.rating}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>({c.reviews} reviews)</span>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                    <Clock size={13} style={{ color: c.accent }} /> {c.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                    <Users size={13} style={{ color: c.accent }} /> {c.batch}
                  </span>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                  {c.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569', marginBottom: 8, fontWeight: 500 }}>
                      <CheckCircle size={13} style={{ color: c.accent, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span className="font-display" style={{ fontSize: 26, color: '#08101e' }}>{c.price}</span>
                    <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 4 }}>/course</span>
                  </div>
                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: c.accent, color: 'white',
                    fontSize: 13, fontWeight: 700, padding: '10px 18px', borderRadius: 100,
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 8px 20px ${c.accent}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    Enroll Now <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .courses-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .courses-grid { grid-template-columns: 1fr !important; } .courses-header { grid-template-columns: 1fr !important; } .guarantee-box { display: none; } }
      `}</style>
    </section>
  );
}
