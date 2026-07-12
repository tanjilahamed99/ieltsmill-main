import { WRITING8_MAP, WRITING8_PART } from "@/mock/Writing/Writing8";

import MainWritingPage from "@/components/Test/Writing/MainWritingPage";

export default function Writing() {
  return (
    <MainWritingPage
      testId={3}
      WRITING_PART={WRITING8_PART}
      WRITING_MAP={WRITING8_MAP}
    />
  );
}
