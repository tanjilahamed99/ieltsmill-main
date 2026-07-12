import ReadingMainPage from "@/components/Test/Reading/ReadingMainPage";
import { Reading10Passage } from "@/mock/Reading/Reading10";
import React from "react";

const ReadingTest = () => {
  return (
    <div>
      <ReadingMainPage testId={5} ReadingPassage={Reading10Passage} />
    </div>
  );
};

export default ReadingTest;
