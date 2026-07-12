import MainWritingPage from "@/components/Test/Writing/MainWritingPage";
import {
  WRITING9_BAR,
  WRITING9_CHANGE,
  WRITING9_PART,
} from "@/mock/Writing/Writing9";

export default function Writing() {

  return (
    <MainWritingPage
      testId={4}
      WRITING_PART={WRITING9_PART}
      WRITING_CHANGE={WRITING9_CHANGE}
      WRITING_BAR={WRITING9_BAR}
    />
  );
}
