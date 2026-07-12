import MainWritingPage from "@/components/Test/Writing/MainWritingPage";
import { WRITING10_PART, WRITING10_PROCESS } from "@/mock/Writing/Writing10";

export default function Writing() {
  return (
    <MainWritingPage
      testId={5}
      WRITING_PART={WRITING10_PART}
      WRITING_PROCESS={WRITING10_PROCESS}
    />
  );
}
