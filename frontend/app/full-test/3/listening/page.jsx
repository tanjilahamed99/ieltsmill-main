import MainListeningTest from "@/components/Test/Listening/MainListeningPage";
import { listening8Questions } from "@/mock/listening/listening8";

const AUDIO_SRC = "/listening-test-8.mp3";

const ListeningTest = () => {
  return (
    <MainListeningTest
      AUDIO_SRC={AUDIO_SRC}
      listeningQuestions={listening8Questions}
      testId={3}
    />
  );
};

export default ListeningTest;
