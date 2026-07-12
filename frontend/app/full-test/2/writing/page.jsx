import { WRITING7_BAR, WRITING7_PART } from "@/mock/Writing/Writing7";

import MainWritingPage from "@/components/Test/Writing/MainWritingPage";

export default function Writing() {
  return (
    <MainWritingPage
      testId={2}
      WRITING_PART={WRITING7_PART}
      WRITING_BAR={WRITING7_BAR}
    />
  );
}
