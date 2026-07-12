import TestMainPage from "@/components/Test/TestMain/TestMain";
import { listening9Answers } from "@/mock/listening/listening9";
import { READING4_ANSWER_KEY } from "@/mock/Reading/Reading4";

export default function MockTestDetailPage() {
  return (
    <>
      <TestMainPage
        testId={4}
        listeningAnswer={listening9Answers}
        readingAnswer={READING4_ANSWER_KEY}
      />
    </>
  );
}
