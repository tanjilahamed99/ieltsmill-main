import MainListeningTest from "@/components/Test/Listening/MainListeningPage";
import { listening10Questions } from "@/mock/listening/listening10";

const AUDIO_SRC = "/listening-test-10.mp3";

const ListeningTest = () => {
  return (
    <MainListeningTest
      AUDIO_SRC={AUDIO_SRC}
      listeningQuestions={listening10Questions}
      testId={5}
    />
  );
};

export default ListeningTest;
