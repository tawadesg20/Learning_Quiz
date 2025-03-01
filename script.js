// Data Structure
const quizData = {
  questions: [
    {
      question: "Learning a new language improves cognitive abilities.",
      correctAnswer: true,
      explanation: "Studies show bilingualism enhances memory and problem-solving.",
    },
    {
      question: "Immersion is less effective than classroom study.",
      correctAnswer: false,
      explanation: "Immersion provides real-world practice and exposure.",
    },
    {
      question: "All languages share the same grammatical structures.",
      correctAnswer: false,
      explanation: "Languages have diverse grammatical structures.",
    },
    {
      question: "Children learn languages faster than adults.",
      correctAnswer: true,
      explanation: "Children's brains have greater plasticity.",
    },
    {
      question: "Vocabulary memorization is the only important part.",
      correctAnswer: false,
      explanation: "Grammar, pronunciation, and culture are crucial.",
    },
  ],
};

// State Management
const quizState = {
  currentQuestionIndex: 0,
  score: 0,
  highScore: localStorage.getItem("highScore") || 0,
};

// DOM Elements
const elements = {
  question: document.getElementById("question"),
  trueButton: document.getElementById("true-btn"),
  falseButton: document.getElementById("false-btn"),
  feedback: document.getElementById("feedback"),
  explanation: document.getElementById("explanation"),
  score: document.getElementById("score"),
  highScore: document.getElementById("high-score"),
  nextButton: document.getElementById("next-button"),
  restartButton: document.getElementById("restart-button"),
  progressBar: document.getElementById("progress-bar"),
};

// Initialization
function initializeQuiz() {
  elements.highScore.textContent = quizState.highScore;
  startQuiz();
}

// Quiz Logic
function startQuiz() {
  quizState.currentQuestionIndex = 0;
  quizState.score = 0;
  shuffleQuestions(quizData.questions);
  showQuestion();
  updateScore();
  updateProgressBar();
  resetUI();

  // Make sure buttons are visible
  elements.trueButton.style.display = "inline-block"; // or "block"
  elements.falseButton.style.display = "inline-block"; // or "block"
}

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  const questionData = quizData.questions[quizState.currentQuestionIndex];
  elements.question.textContent = questionData.question;
  elements.trueButton.classList.remove("correct-answer");
  elements.falseButton.classList.remove("correct-answer");
}

function checkAnswer(userAnswer) {
  const questionData = quizData.questions[quizState.currentQuestionIndex];
  if (userAnswer === questionData.correctAnswer) {
    elements.feedback.textContent = "Correct!";
    elements.feedback.classList.remove("feedback-incorrect");
    elements.feedback.classList.add("feedback-correct");
    quizState.score++;
  } else {
    elements.feedback.textContent = "Incorrect!";
    elements.feedback.classList.remove("feedback-correct");
    elements.feedback.classList.add("feedback-incorrect");
    const correctAnswerButton = questionData.correctAnswer
      ? elements.trueButton
      : elements.falseButton;
    correctAnswerButton.classList.add("correct-answer");
  }
  elements.explanation.textContent = questionData.explanation;
  disableButtons();
  elements.nextButton.style.display = "block";
  updateScore();
  updateProgressBar();
}

function nextQuestion() {
  quizState.currentQuestionIndex++;
  if (quizState.currentQuestionIndex < quizData.questions.length) {
    showQuestion();
    resetUI();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  elements.question.textContent = "Quiz Completed!";
  hideButtons();
  elements.restartButton.style.display = "block";
  if (quizState.score > quizState.highScore) {
    quizState.highScore = quizState.score;
    localStorage.setItem("highScore", quizState.highScore);
    elements.highScore.textContent = quizState.highScore;
  }
}

function updateScore() {
  elements.score.textContent = quizState.score;
}

function updateProgressBar() {
  const progressPercent =
    ((quizState.currentQuestionIndex + 1) / quizData.questions.length) * 100;
  elements.progressBar.style.width = `${progressPercent}%`;
}

// UI Management
function resetUI() {
  elements.feedback.textContent = "";
  elements.explanation.textContent = "";
  elements.nextButton.style.display = "none";
  elements.trueButton.disabled = false;
  elements.falseButton.disabled = false;
}

function disableButtons() {
  elements.trueButton.disabled = true;
  elements.falseButton.disabled = true;
}

function hideButtons() {
  elements.trueButton.style.display = "none";
  elements.falseButton.style.display = "none";
}

// Event Listeners
elements.trueButton.addEventListener("click", () => checkAnswer(true));
elements.falseButton.addEventListener("click", () => checkAnswer(false));
elements.nextButton.addEventListener("click", nextQuestion);
elements.restartButton.addEventListener("click", startQuiz);

// Start the quiz
initializeQuiz();