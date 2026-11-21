"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../features/Store";
import { logout } from "../../features/slice/auth/authSlice";
import logo from "../../public/fav.png";
import Image from "next/image";
import { Lock, ChevronDown, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // Ensure no hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [mobileOpen]);

  // Determine if the user has access to locked content
  const isApproved = user && (user.status === "approved" || user.role === "admin");

  const navLinks = [
    {
      label: "Reading",
      href: "/reading",
      locked: false,
    },
    {
      label: "Resources",
      href: "/resources",
      locked: !isApproved,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative transition-transform duration-300 group-hover:scale-110">
            <Image
              src={logo}
              alt="IELTS-MILL Logo"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-gray-900 text-xl tracking-tight leading-tight">
              IELTS
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                -MILL
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.locked ? (
                <button
                  onClick={() => {
                    if (!user) window.location.href = "/login";
                    else alert("Your account is pending approval. Please contact support to unlock the Resources.");
                  }}
                  className="flex items-center gap-1.5 text-sm text-gray-400 font-medium whitespace-nowrap cursor-not-allowed transition-all duration-200 hover:text-gray-600"
                >
                  {link.label}
                  <Lock className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap transition-all duration-200 relative"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Auth Buttons / User Dropdown */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {!mounted ? (
            <div className="w-24 h-10 bg-gray-100 rounded-full animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                  {user.name || "User"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
                  userMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                      <User className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-white text-sm font-bold px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Start for Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation (Slide Down) */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-6">
          
          {/* Mobile Nav Links */}
          <div className="space-y-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.locked ? (
                  <button
                    onClick={() => {
                      if (!user) window.location.href = "/login";
                      else alert("Your account is pending approval. Please contact support to unlock the Resources.");
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-base font-medium text-gray-400 cursor-not-allowed"
                  >
                    {link.label}
                    <Lock className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-base font-medium text-gray-900"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {mounted && user && (
              <Link
                href="/dashboard"
                className="block text-base font-medium text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-gray-100">
            {!mounted ? (
              <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
            ) : user ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setMobileOpen(false);
                }}
                className="w-full text-white text-sm font-bold px-5 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-md active:scale-95 transition-transform"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full text-center text-sm font-semibold text-gray-700 border border-gray-300 px-4 py-3 rounded-full hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center text-white text-sm font-bold px-5 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-md active:scale-95 transition-transform"
                  onClick={() => setMobileOpen(false)}
                >
                  Start for Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;