import TestMainPage from "@/components/Test/TestMain/TestMain";
import { listening8Answers } from "@/mock/listening/listening8";
import { READING4_ANSWER_KEY } from "@/mock/Reading/Reading4";

export default function MockTestDetailPage() {
  return (
    <>
      <TestMainPage
        testId={3}
        listeningAnswer={listening8Answers}
        readingAnswer={READING4_ANSWER_KEY}
      />
    </>
  );
}
