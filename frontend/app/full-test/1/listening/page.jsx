import MainListeningTest from "@/components/Test/Listening/MainListeningPage";
import { listening6Questions } from "@/mock/listening/listening6";

const AUDIO_SRC = "/listening-test-6.mp3";

const ListeningTest = () => {
  return (
    <MainListeningTest
      AUDIO_SRC={AUDIO_SRC}
      listeningQuestions={listening6Questions}
      testId={1}
    />
  );
};

export default ListeningTest;
