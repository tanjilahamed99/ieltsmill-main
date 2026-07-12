import MainListeningTest from "@/components/Test/Listening/MainListeningPage";
import { listening9Questions } from "@/mock/listening/listening9";

const AUDIO_SRC = "/listening-test-9.mp3";

const ListeningTest = () => {
  return (
    <MainListeningTest
      AUDIO_SRC={AUDIO_SRC}
      listeningQuestions={listening9Questions}
      testId={4}
    />
  );
};

export default ListeningTest;
