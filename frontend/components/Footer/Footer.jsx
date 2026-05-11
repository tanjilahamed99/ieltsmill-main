import Image from "next/image";
import logo from "../../public/logo.png";

const Footer = () => {
  const footerCols = [
    {
      title: "IELTS Official Links",
      links: [
        "Official IELTS Website",
        "British Council IELTS",
        "IDP IELTS",
        "Cambridge IELTS",
      ],
    },
    {
      title: "Mock Test",
      links: [
        "Full Test",
        "Listening Test",
        "Reading Test",
        "Writing Test",
        "Speaking Test",
      ],
    },
    {
      title: "Self Practice",
      links: ["Listening", "Reading", "Writing", "Speaking"],
    },
    {
      title: "Study IELTS",
      links: [
        "Writing Task Checker",
        "IELTS Course",
        "Study Roadmap",
        "AI Tutor",
        "Phrase & Idioms",
        "English Grammar",
        "Writing Template",
        "IELTS Score Calculator",
        "Vocabulary",
      ],
    },
    {
      title: "Quick Links",
      links: ["Teacher Mode", "Blog", "About Us", "FAQ"],
    },
  ];

  return (
    <footer className="text-[#CBD5E1] bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid lg:grid-cols-6 gap-10 pb-10 border-b border-white/10">
          {/* Left: app + social */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <Image
                src={logo}
                alt="ILTS MILL Logo"
                width={500}
                height={36}
                className="w-40 h-10"
                priority
              />
            </a>

            <div>
              <p className="text-white text-xs font-semibold mb-3">
                Follow Us on Social Media
              </p>
              <div className="flex gap-2.5">
                {[
                  <svg
                    key="fb"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>,
                  <svg
                    key="ig"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line
                      x1="17.5"
                      y1="6.5"
                      x2="17.51"
                      y2="6.5"
                      strokeLinecap="round"
                    />
                  </svg>,
                  <svg
                    key="yt"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                    <polygon
                      points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                      fill={"text-dark"}
                    />
                  </svg>,
                  <svg
                    key="dc"
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                  </svg>,
                ].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {footerCols.slice(0, 4).map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-bold text-sm mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-slate-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Quick Links + Address merged */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-4 grid sm:grid-cols-2 gap-6 pt-2 border-t border-white/10">
              <div>
                <h4 className="text-white font-bold text-sm mb-4">
                  Quick Links
                </h4>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {footerCols[4].links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-slate-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-4">Address</h4>
                <address className="not-italic text-xs text-slate-400 leading-relaxed space-y-1.5">
                  <p>25/6 Huguliya, Narsingdi, Bangladesh</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:support@iltsmill.com"
                      className="hover:text-white transition-colors">
                      support@iltsmill.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+8801996643722"
                      className="hover:text-white transition-colors">
                      +8801996643722
                    </a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex gap-5">
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Copyright © 2026{" "}
              <span className="text-white font-semibold">ILTSMILL.</span> All
              rights reserved.
            </p>
          </div>
          <p className="text-[10px] text-slate-600 text-center leading-relaxed max-w-3xl mx-auto">
            Disclaimer: IELTS® is a registered trademark of British Council,
            IDP: IELTS Australia, and Cambridge Assessment English. This
            platform is not affiliated with, approved by, or endorsed by the
            trademark owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
