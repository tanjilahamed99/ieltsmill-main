import {
  WRITING6_PART,
  WRITING6_TABLE_COFFEE,
  WRITING6_TABLE_TEA,
} from "@/mock/Writing/Writing6";

import MainWritingPage from "@/components/Test/Writing/MainWritingPage";

export default function Writing() {
  return (
    <MainWritingPage
      testId={1}
      WRITING_PART={WRITING6_PART}
      WRITING_TABLE_COFFEE={WRITING6_TABLE_COFFEE}
      WRITING_TABLE_TEA={WRITING6_TABLE_TEA}
    />
  );
}
