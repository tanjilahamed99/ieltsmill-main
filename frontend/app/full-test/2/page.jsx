import TestMainPage from "@/components/Test/TestMain/TestMain";
import { listening7Answers } from "@/mock/listening/listening7";
import { READING4_ANSWER_KEY } from "@/mock/Reading/Reading4";

export default function MockTestDetailPage() {
  return (
    <>
      <TestMainPage
        testId={2}
        listeningAnswer={listening7Answers}
        readingAnswer={READING4_ANSWER_KEY}
      />
    </>
  );
}
