import ReadingMainPage from "@/components/Test/Reading/ReadingMainPage";
import { Reading9Passage } from "@/mock/Reading/Reading9";
import React from "react";

const ReadingTest = () => {
  return (
    <div>
      <ReadingMainPage testId={4} ReadingPassage={Reading9Passage} />
    </div>
  );
};

export default ReadingTest;
