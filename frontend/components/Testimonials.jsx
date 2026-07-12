'use client';

const testimonials = [
  {
    name: 'Md. Rafiqul Islam', score: 'IELTS Band 7.5', dest: 'Now in 🇨🇦 Canada',
    text: 'Macron Worldwide changed my life. I was stuck at Band 6 for years, but after 2 months of coaching here I achieved 7.5. The teachers explain every detail perfectly.',
    initials: 'RI', accent: '#2563eb',
  },
  {
    name: 'Sumaiya Akter', score: 'IELTS Band 8.0', dest: 'Now in 🇬🇧 UK',
    text: 'The speaking practice sessions were incredible. I felt so prepared on exam day. Macron is truly the best IELTS coaching center in Narsingdi — highly recommended!',
    initials: 'SA', accent: '#059669',
  },
  {
    name: 'Tanvir Hossain', score: 'PTE Academic 79', dest: 'Now in 🇦🇺 Australia',
    text: 'The PTE course was very thorough. The mock tests helped me understand exactly where I needed to improve. Got my visa within 3 months of starting here.',
    initials: 'TH', accent: '#c8963e',
  },
  {
    name: 'Nusrat Jahan', score: 'IELTS Band 7.0', dest: 'University in 🇩🇪 Germany',
    text: 'Best decision I made! The study abroad counseling team helped me with everything from selecting universities to getting my visa. So grateful to Macron!',
    initials: 'NJ', accent: '#7c3aed',
  },
  {
    name: 'Arif Chowdhury', score: 'TOEFL 104', dest: 'Now in 🇺🇸 USA',
    text: 'I never thought I could score above 100 in TOEFL. The integrated tasks training at Macron was exceptional. The faculty pushed me beyond what I thought possible.',
    initials: 'AC', accent: '#be123c',
  },
  {
    name: 'Fatema Begum', score: 'OET Grade B', dest: 'Now a Nurse in 🇬🇧 UK',
    text: 'As a nurse, OET was crucial for my UK registration. The OET course at Macron is perfectly designed for healthcare professionals. I passed on my first attempt!',
    initials: 'FB', accent: '#d97706',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '100px 0', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="label-tag" style={{ justifyContent: 'center' }}>Success Stories</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: '#08101e', lineHeight: 1.1, marginBottom: 16 }}>
            Inspiring Journeys of<br /><span className="gold-text">Our Students</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Real students, real results. Hear from Macron Worldwide alumni who achieved their dream scores and are now studying around the world.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }} className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="card-lift" style={{
              background: '#faf7f2', borderRadius: 24,
              padding: 32, border: '1px solid #e8e2d9',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Subtle accent strip */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>)}
              </div>

              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid #e8e2d9' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: 15, flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#08101e' }}>{t.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.accent, marginTop: 2 }}>{t.score}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.dest}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Join 500+ students who transformed their lives with Macron Worldwide</p>
          <a href="#contact" className="btn-gold">Start Your Success Story →</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .testimonials-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
