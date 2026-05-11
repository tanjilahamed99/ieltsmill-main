import React from "react";

const SectionLabel = ({
  children,
  cls,
}) => {
  return (
    <div
      className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${cls}`}>
      {children}
    </div>
  );
};

export default SectionLabel;
