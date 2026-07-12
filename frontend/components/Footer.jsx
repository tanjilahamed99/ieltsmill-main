'use client';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  Courses: ['IELTS Academic', 'IELTS General', 'TOEFL iBT', 'PTE Academic', 'OET', 'Spoken English'],
  'Study Abroad': ['United Kingdom', 'Canada', 'Australia', 'USA', 'Germany', 'Finland'],
  'Quick Links': ['About Us', 'Success Stories', 'Free Resources', 'Blog', 'Contact'],
};

export default function Footer() {
  return (
    <footer style={{ background: '#08101e', color: 'white' }}>
      {/* CTA Strip */}
      <div style={{ background: 'linear-gradient(90deg, #c8963e, #e8b96a)', padding: '20px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div className="font-display" style={{ fontSize: 22, color: '#08101e', fontWeight: 400 }}>
            Ready to achieve your target band score?
          </div>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#08101e', color: 'white',
            padding: '12px 24px', borderRadius: 100,
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            Book Free Demo Now <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'linear-gradient(135deg, #c8963e, #e8b96a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(200,150,62,0.4)',
              }}>
                <span style={{ fontFamily: 'DM Serif Display,serif', fontSize: 22, color: '#08101e', fontWeight: 700 }}>M</span>
              </div>
              <div>
                <div style={{ fontFamily: 'DM Serif Display,serif', fontSize: 20, color: 'white' }}>Macron Worldwide</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#c8963e' }}>Narsingdi</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.8, maxWidth: 300, marginBottom: 24 }}>
              Narsingdi&apos;s premier IELTS, TOEFL, PTE coaching center and study abroad consultancy. Helping students from Bangladesh achieve global education dreams since 2016.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                { Icon: MapPin, text: 'Narsingdi, Dhaka Division, Bangladesh' },
                { Icon: Phone, text: '+880 1XXX-XXXXXX' },
                { Icon: Mail, text: 'info@macronworldwide.com' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                  <Icon size={13} style={{ color: '#c8963e', flexShrink: 0 }} /> {text}
                </div>
              ))}
            </div>
            <a href="https://www.facebook.com/macron.narsingdi/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#1877f2', color: 'white', padding: '10px 18px',
              borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}>
              📘 Follow on Facebook
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#c8963e', marginBottom: 24 }}>{category}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#c8963e'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>© 2024 Macron Worldwide — Narsingdi. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
