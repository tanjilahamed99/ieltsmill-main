"use client";
// app/practice/writing/[id]/page.tsx

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  StartOverlay,
  SubmitModal,
  TestTopBar,
} from "../../../../components/Shared/Testsharedui";
import ResultModal from "../../../../components/Shared/Resultmodal";
import { UserRoute } from "../../../../Providers/PrivateRoute";

const cw = (t) => t.trim().split(/\s+/).filter(Boolean).length;

function TaskPanel({ task, response, onChange, isActive }) {
  const words = cw(response);
  const minW = task.wordLimit || (task.taskNumber === 1 ? 150 : 250);
  const pct = Math.min((words / minW) * 100, 100);
  const ok = words >= minW;
  return (
    <div className={`flex flex-col h-full ${isActive ? "" : "hidden"}`}>
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase">
            {task.taskTitle}
          </span>
          <span className="text-xs text-gray-400">
            ⏱ {task.timeGuide} min · Min {minW} words
          </span>
        </div>
        {task.diagramUrls?.filter(Boolean).length > 0 && (
          <div
            className={`grid gap-3 mb-3 ${task.diagramUrls.filter(Boolean).length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {task.diagramUrls.filter(Boolean).map((url, i) => (
              <Image
                key={i}
                src={url}
                alt=""
                className="w-full max-h-44 object-contain rounded-xl border border-gray-100"
                height={500}
                width={500}
              />
            ))}
          </div>
        )}
        <p className="text-sm text-gray-700 leading-relaxed">{task.prompt}</p>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <textarea
          value={response}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            task.taskNumber === 1
              ? "Summarise the information, selecting and reporting the main features…"
              : "Give your opinion and support it with relevant examples…"
          }
          className="flex-1 w-full p-4 text-sm text-gray-800 leading-relaxed border border-gray-200 rounded-2xl outline-none resize-none font-serif
            focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all placeholder-gray-300"
          style={{ minHeight: "280px" }}
        />
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span
              className={`font-bold ${ok ? "text-green-600" : words > 0 ? "text-orange-500" : "text-gray-400"}`}>
              {words} words{" "}
              {ok
                ? `(+${words - minW} over minimum ✓)`
                : words > 0
                  ? `(${minW - words} more needed)`
                  : ""}
            </span>
            <span className="text-gray-400">Min {minW}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                background: ok ? "#10B981" : "#F59E0B",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WritingPracticePage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id;
  const user = useAppSelector((state) => state.auth.user);

  const [testData, setTestData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);

  const session = useTestSession({
    testId,
    testType: "writing",
    testTitle: testData?.title || "",
    seriesId: testData?.seriesId || "",
    testNumber: testData?.testNumber || 0,
    userId: user?._id,
    totalSeconds: 60 * 60,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getTest("writing", testId);
      if (data.success) {
        setTestData(data.data);
        setPageLoading(false);
      }
    };
    fetch();
  }, [testId]);

  if (pageLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  if (!testData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Test not found
      </div>
    );

  const getResponse = (taskNum) =>
    session.writingResp.find((r) => r.taskNumber === taskNum)?.responseText ||
    "";
  const r = session.result;

  return (
    <UserRoute>
      <div
        className="min-h-screen bg-white flex flex-col"
        style={{
          fontFamily: "'Plus Jakarta Sans','DM Sans',ui-sans-serif,sans-serif",
        }}>
        {!session.started && !session.submitted && (
          <StartOverlay
            testTitle={testData.title}
            testType="writing"
            totalQuestions={2}
            duration="60 min"
            onStart={session.startSession}
            loading={session.loading}
          />
        )}
        {showSubmit && (
          <SubmitModal
            answeredCount={
              testData.tasks.filter((t) => cw(getResponse(t.taskNumber)) > 0)
                .length
            }
            totalCount={testData.tasks.length}
            onConfirm={() => {
              setShowSubmit(false);
              session.handleSubmit();
            }}
            onCancel={() => setShowSubmit(false)}
            loading={session.loading}
          />
        )}

        {/* Writing result modal — shows pending scoring message */}
        {session.showResult && r && (
          <ResultModal
            testTitle={testData.title}
            testType="writing"
            score={0}
            totalQuestions={2}
            band={null}
            sectionScores={[]}
            questionResults={[]}
            timeSpent={r.timeSpent || 0}
            writingPending={true}
            onClose={() => router.push("/mock-test?type=writing")}
            onReview={() => session.setShowResult(false)}
          />
        )}

        <TestTopBar
          title={testData.title}
          timeFormatted={session.submitted ? "Done ✓" : session.timeFormatted}
          isLowTime={session.isLowTime}
          onSubmit={() =>
            session.submitted
              ? session.setShowResult(true)
              : setShowSubmit(true)
          }
        />

        {/* Task tabs */}
        <div className="bg-white border-b border-gray-200 flex items-center px-4 gap-1">
          {testData.tasks?.map((task, i) => {
            const wc = cw(getResponse(task.taskNumber));
            const ok =
              wc >= (task.wordLimit || (task.taskNumber === 1 ? 150 : 250));
            return (
              <button
                key={i}
                onClick={() => setActiveTask(i)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all"
                style={
                  i === activeTask
                    ? { borderBottomColor: "#EF4444", color: "#EF4444" }
                    : { borderBottomColor: "transparent", color: "#9CA3AF" }
                }>
                Task {task.taskNumber}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ok ? "bg-green-100 text-green-700" : wc > 0 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}>
                  {wc}w
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex-1 flex flex-col"
          style={{ height: "calc(100vh - 112px)" }}>
          {testData.tasks?.map((task, i) => (
            <TaskPanel
              key={i}
              task={task}
              response={getResponse(task.taskNumber)}
              onChange={(v) =>
                !session.submitted &&
                session.setWritingResponse(task.taskNumber, v)
              }
              isActive={i === activeTask}
            />
          ))}
        </div>
      </div>
    </UserRoute>
  );
}
