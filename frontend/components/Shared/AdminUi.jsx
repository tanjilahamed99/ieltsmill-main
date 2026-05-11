"use client";
// components/shared/AdminUI.tsx
// All reusable atoms used across admin forms

import { useState, useRef } from "react";

const C = {
  primary: "#EF4444",
  grad: "linear-gradient(135deg,#EF4444,#F97316)",
  dark: "#0F172A",
  surface: "#F8FAFC",
  border: "#E2E8F0",
};

// ─── Section Card ─────────────────────────────────────────────────────────────
export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
    <div>
      <h3 className="font-bold text-slate-800 text-base">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// ─── Form primitives ──────────────────────────────────────────────────────────
export const Label = ({ children, required }) => (
  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  ...rest
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 
      outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all bg-white ${className}`}
    {...rest}
  />
);

export const Textarea = ({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800
      outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all bg-white resize-y ${className}`}
  />
);

export const Select = ({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800
      outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all bg-white ${className}`}>
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

export const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <div
      onClick={() => onChange(!checked)}
      className="relative w-11 h-6 rounded-full transition-all"
      style={{ background: checked ? C.primary : "#CBD5E1" }}>
      <div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
        style={{ left: checked ? "calc(100% - 20px)" : "4px" }}
      />
    </div>
    <span className="text-sm text-slate-600 font-medium">{label}</span>
  </label>
);

// ─── Buttons ──────────────────────────────────────────────────────────────────
export const Btn = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
}) => {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };
  const variants = {
    primary: { background: C.grad, color: "white", border: "none" },
    secondary: {
      background: "white",
      color: "#334155",
      border: "1px solid #E2E8F0",
    },
    ghost: { background: "transparent", color: "#64748B", border: "none" },
    danger: {
      background: "#FEF2F2",
      color: "#EF4444",
      border: "1px solid #FECACA",
    },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 font-semibold rounded-xl transition-all
        hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]} ${className}`}
      style={variants[variant]}>
      {children}
    </button>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────
export const Badge = ({ children, color = "gray" }) => {
  const colors = {
    gray: "bg-slate-100 text-slate-600",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return (
    <span
      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

// ─── Number badge (Q number indicator) ───────────────────────────────────────
export const QNum = ({ n }) => (
  <span
    className="inline-flex w-6 h-6 rounded-md items-center justify-center text-white text-xs font-bold flex-shrink-0"
    style={{ background: C.grad }}>
    {n}
  </span>
);

// ─── Audio upload widget ──────────────────────────────────────────────────────
export const AudioUpload = ({ value, onChange, label = "Audio File" }) => {
  const [uploading, setUploading] = useState(false);
  const ref = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("audio", file);
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/upload/audio",
        {
          method: "POST",
          body: fd,
        },
      );
      const data = await res.json();
      console.log(data);
      if (data.url) onChange(data.url);
    } catch {
      /* show toast */
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-red-300 transition-all">
        {value ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">
                {value.split("/").pop()}
              </p>
              <audio controls src={value} className="mt-1 h-8 w-full" />
            </div>
            <button
              onClick={() => onChange("")}
              className="text-slate-400 hover:text-red-500 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="w-full flex flex-col items-center gap-2 py-2"
            disabled={uploading}>
            {uploading ? (
              <div className="w-6 h-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
            ) : (
              <svg
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            )}
            <span className="text-xs text-slate-400 font-medium">
              {uploading ? "Uploading…" : "Click to upload MP3 / OGG"}
            </span>
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {/* OR paste URL */}
      <div className="mt-2">
        <Input
          value={value}
          onChange={onChange}
          placeholder="Or paste audio URL directly…"
        />
      </div>
    </div>
  );
};

// ─── Image upload widget ──────────────────────────────────────────────────────
export const ImageUpload = ({ value, onChange, label = "Image" }) => {
  const [uploading, setUploading] = useState(false);
  const ref = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/upload/image",
        {
          method: "POST",
          body: fd,
        },
      );
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch {
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 bg-slate-50 hover:border-red-300 transition-all">
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt=""
              className="w-full max-h-48 object-contain rounded-lg"
            />
            <button
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="w-full flex flex-col items-center gap-2 py-4"
            disabled={uploading}>
            {uploading ? (
              <div className="w-6 h-6 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
            ) : (
              <svg
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            )}
            <span className="text-xs text-slate-400 font-medium">
              {uploading ? "Uploading…" : "Click to upload image"}
            </span>
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      <div className="mt-2">
        <Input
          value={value}
          onChange={onChange}
          placeholder="Or paste image URL…"
        />
      </div>
    </div>
  );
};

// ─── Step Indicator ──────────────────────────────────────────────────────────
export const StepBar = ({ steps, current }) => (
  <div className="flex items-center gap-0">
    {steps.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={
                done
                  ? { background: "#10B981", color: "white" }
                  : active
                    ? { background: C.primary, color: "white" }
                    : { background: "#F1F5F9", color: "#94A3B8" }
              }>
              {done ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs font-semibold hidden sm:block ${active ? "text-slate-800" : done ? "text-emerald-600" : "text-slate-400"}`}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-8 h-0.5 mx-2"
              style={{ background: done ? "#10B981" : "#E2E8F0" }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Collapsible section ──────────────────────────────────────────────────────
export const Collapsible = ({
  title,
  subtitle,
  children,
  defaultOpen = true,
  badge,
  onDelete,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-3.5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18l6-6-6-6"
            />
          </svg>
          <div>
            <span className="text-sm font-bold text-slate-700">{title}</span>
            {subtitle && (
              <span className="text-xs text-slate-400 ml-2">{subtitle}</span>
            )}
          </div>
          {badge && <Badge color="blue">{badge}</Badge>}
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-slate-300 hover:text-red-500 transition-colors p-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────
export const Toast = ({ msg, type = "success", onClose }) => (
  <div
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold animate-bounce-in"
    style={{
      background:
        type === "success"
          ? "linear-gradient(135deg,#10B981,#059669)"
          : "linear-gradient(135deg,#EF4444,#DC2626)",
    }}>
    <span>{type === "success" ? "✓" : "✕"}</span>
    {msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
      ×
    </button>
  </div>
);
