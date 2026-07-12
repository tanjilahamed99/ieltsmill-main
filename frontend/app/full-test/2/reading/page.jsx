import ReadingMainPage from "@/components/Test/Reading/ReadingMainPage";
import { Reading7Passage } from "@/mock/Reading/Reading7";
import React from "react";

const ReadingTest = () => {
  return (
    <div>
      <ReadingMainPage testId={2} ReadingPassage={Reading7Passage} />
    </div>
  );
};

export default ReadingTest;