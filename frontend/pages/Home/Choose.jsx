import React from "react";

const Choose = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
        Why Students Choose{" "}
        <span
          className="bg-linear-to-r from-primary to-secondary"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          ILTSMILL
        </span>
      </h2>
      <p className="text-gray-500 text-base max-w-lg mx-auto">
        Master IELTS with comprehensive practice tests, expert scoring, and
        proven strategies.
      </p>
    </section>
  );
};

export default Choose;
