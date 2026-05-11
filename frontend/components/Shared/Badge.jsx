import React from "react";

const Badge = ({
  children,
  cls = "bg-red-50 text-red-600 border-red-100",
}) => {
  return (
    <div
      className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${cls}`}>
      {children}
    </div>
  );
};

export default Badge;
