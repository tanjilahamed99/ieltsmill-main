import ReadingMainPage from "@/components/Test/Reading/ReadingMainPage";
import { Reading8Passage } from "@/mock/Reading/Reading8";
import React from "react";

const ReadingTest = () => {
  return (
    <div>
      <ReadingMainPage testId={3} ReadingPassage={Reading8Passage} />
    </div>
  );
};

export default ReadingTest;
