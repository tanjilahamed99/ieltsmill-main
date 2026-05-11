"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/Store";
import { logout } from "../../features/slice/auth/authSlice";
import logo from "../../public/fav.png";
import Image from "next/image";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // Dropdown content for Mock Test
  const mockTestDropdown = [
    {
      label: "Full Test",
      href: "/ilts-test",
      description: "Real like exam with 4 sections",
    },
    {
      label: "Listening Test",
      href: "/ilts-test?type=listening",
      description: "Train your listening skills",
    },
    {
      label: "Reading Test",
      href: "/ilts-test?type=reading",
      description: "Improve your reading skills",
    },
    {
      label: "Writing Test",
      href: "/ilts-test?type=writing",
      description: "Enhance your writing abilities",
    },
    {
      label: "Speaking Test",
      href: "/ilts-test?type=speaking",
      description: "Practice speaking tasks",
    },
  ];

  // Dropdown content for Self Practice
  const selfPracticeDropdown = [
    {
      label: "Reading Practice",
      href: "/self-practice",
      description: "Expand your reading",
    },
  ];

  const navLinks = [
    {
      label: "Mock Test",
      drop: true,
      dropdownItems: mockTestDropdown,
    },
    {
      label: "Self Practice",
      drop: true,
      dropdownItems: selfPracticeDropdown,
    },
  ];

  const handleDropdownEnter = (label) => {
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo Section - Improved */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          {/* Logo with hover effect */}
          <div className="relative">
            <Image
              src={logo}
              alt="ILTS MILL Logo"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>

          {/* Text logo with gradient */}
          <div className="flex flex-col">
            <span className="font-black text-gray-900 text-xl tracking-tight leading-tight">
              IELTS
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
                MILL
              </span>
            </span>
            {/* Optional: Small tagline */}
            {/* <span className="text-[8px] text-gray-400 tracking-wider -mt-0.5">IELTS PREPARATION</span> */}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.drop && handleDropdownEnter(link.label)}
              onMouseLeave={handleDropdownLeave}>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap transition-colors">
                {link.label}
                {link.drop && (
                  <svg
                    className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.drop && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="py-2">
                    {link.dropdownItems?.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors group">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-3 bg-gray-50">
                    <Link
                      href={`${link.label === "Mock Test" ? "/mock-test" : "/self-practice"}`}
                      className="flex items-center justify-between text-sm text-primary hover:text-secondary font-medium">
                      View All {link.label}s
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          {typeof window !== "undefined" && user && (
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {typeof window === "undefined" ? (
            // Show placeholder to maintain layout
            <div className="w-24 h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : user ? (
            <button
              onClick={() => dispatch(logout())}
              className="text-white text-sm font-bold px-5 py-2.5 bg-linear-to-r from-red-500 to-orange-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link
                href="/login"
                className="text-white text-sm font-bold px-5 py-2.5 bg-linear-to-r from-red-500 to-orange-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
                Start for Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-1 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <div key={link.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                {link.dropdownItems?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block text-sm text-gray-600 py-1 hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {typeof window !== "undefined" && user && (
            <Link
              href="/dashboard"
              className="block text-sm font-medium text-gray-700 py-2"
              onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
          )}

          <div className="pt-3 space-y-3">
            {typeof window === "undefined" ? (
              <div className="h-10 bg-gray-100 rounded-full animate-pulse" />
            ) : user ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setMobileOpen(false);
                }}
                className="w-full text-white text-sm font-bold px-5 py-2.5 bg-linear-to-r from-red-500 to-orange-500 rounded-full shadow-md">
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="flex-1 text-center text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center text-white text-sm font-bold px-5 py-2.5 bg-linear-to-r from-red-500 to-orange-500 rounded-full shadow-md"
                  onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Optional: Add gradient text support for older browsers */
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
