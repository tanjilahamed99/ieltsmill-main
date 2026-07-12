import TestMainPage from "@/components/Test/TestMain/TestMain";
import { listening6Answers } from "@/mock/listening/listening6";
import { READING4_ANSWER_KEY } from "@/mock/Reading/Reading4";

export default function MockTestDetailPage() {
  return (
    <>
      <TestMainPage
        testId={1}
        listeningAnswer={listening6Answers}
        readingAnswer={READING4_ANSWER_KEY}
      />
    </>
  );
}
