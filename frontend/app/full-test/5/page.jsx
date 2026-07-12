import TestMainPage from "@/components/Test/TestMain/TestMain";
import { listening10Answers } from "@/mock/listening/listening10";
import { READING4_ANSWER_KEY } from "@/mock/Reading/Reading4";

export default function MockTestDetailPage() {
  return (
    <>
      <TestMainPage
        testId={5}
        listeningAnswer={listening10Answers}
        readingAnswer={READING4_ANSWER_KEY}
      />
    </>
  );
}
