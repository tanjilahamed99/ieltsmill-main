import MainListeningTest from "@/components/Test/Listening/MainListeningPage";
import { listening7Questions } from "@/mock/listening/listening7";

const AUDIO_SRC = "/listening-test-7.mp3";

const ListeningTest = () => {
  return (
    <MainListeningTest
      AUDIO_SRC={AUDIO_SRC}
      listeningQuestions={listening7Questions}
      testId={2}
    />
  );
};

export default ListeningTest;
