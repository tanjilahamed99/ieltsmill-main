export function scoreListening(userAnswers, answerKey) {
  let correct = 0;
  const results = {};

  for (const [qNum, correctAnswer] of Object.entries(answerKey)) {
    const userAnswer = (userAnswers[qNum] ?? "").toString().trim().toLowerCase();
    const expected = correctAnswer.toString().trim().toLowerCase();
    const isCorrect = userAnswer === expected;
    if (isCorrect) correct++;
    results[qNum] = { userAnswer, correctAnswer: expected, isCorrect };
  }

  return { correct, total: Object.keys(answerKey).length, results };
}