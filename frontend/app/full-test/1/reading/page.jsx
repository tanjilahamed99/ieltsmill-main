import ReadingMainPage from "@/components/Test/Reading/ReadingMainPage";
import { Reading6Passage } from "@/mock/Reading/Reading6";
import React from "react";

const ReadingTest = () => {
  return (
    <div>
      <ReadingMainPage testId={1} ReadingPassage={Reading6Passage} />
    </div>
  );
};

export default ReadingTest;
