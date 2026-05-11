import React from "react";

const PrimaryBtn = ({
  children,
  href = "#",
}) => {
  return (
    <a
      href={href}
      className="inline-block text-white bg-gold font-bold px-6 py-3 rounded-full text-sm shadow-lg hover:scale-105 hover:shadow-xl transition-all">
      {children}
    </a>
  );
};

export default PrimaryBtn;
