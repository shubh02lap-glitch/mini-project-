const questions = [
    {
        category: "General Knowledge",
        question: "What is the capital city of Australia?",
        answers: [
            "Sydney",
            "Melbourne",
            "Canberra",
            "Perth"
        ],
        correct: 2
    },

    {
        category: "Science",
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Venus",
            "Mars",
            "Jupiter",
            "Mercury"
        ],
        correct: 1
    },

    {
        category: "Technology",
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },

    {
        category: "Geography",
        question: "Which is the largest ocean on Earth?",
        answers: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
        ],
        correct: 2
    },

    {
        category: "Science",
        question: "How many bones are there in the adult human body?",
        answers: [
            "186",
            "206",
            "226",
            "246"
        ],
        correct: 1
    },

    {
        category: "Technology",
        question: "Which language is primarily used to add interactivity to web pages?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },

    {
        category: "History",
        question: "Who was the first person to walk on the Moon?",
        answers: [
            "Buzz Aldrin",
            "Neil Armstrong",
            "Yuri Gagarin",
            "Michael Collins"
        ],
        correct: 1
    },

    {
        category: "Science",
        question: "What gas do plants primarily absorb from the atmosphere?",
        answers: [
            "Oxygen",
            "Nitrogen",
            "Carbon Dioxide",
            "Hydrogen"
        ],
        correct: 2
    },

    {
        category: "Geography",
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            "China",
            "South Korea",
            "Thailand",
            "Japan"
        ],
        correct: 3
    },

    {
        category: "Technology",
        question: "Which company developed the Android operating system?",
        answers: [
            "Microsoft",
            "Google",
            "Apple",
            "IBM"
        ],
        correct: 1
    }
];


// =============================
// VARIABLES
// =============================

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);


// =============================
// DOM ELEMENTS
// =============================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const categoryElement = document.getElementById("category");

const currentQuestionElement =
    document.getElementById("current-question");

const questionCountElement =
    document.getElementById("question-count");

const progressElement =
    document.getElementById("progress");

const percentageElement =
    document.getElementById("percentage");

const scoreElement =
    document.getElementById("score");


// =============================
// START QUIZ
// =============================

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    userAnswers = new Array(questions.length).fill(null);

    scoreElement.textContent = score;

    questionCountElement.textContent = questions.length;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}


// =============================
// SHOW QUESTION
// =============================

function showQuestion() {

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    categoryElement.textContent = question.category;

    currentQuestionElement.textContent = currentQuestion + 1;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressElement.style.width = `${progress}%`;

    percentageElement.textContent =
        `${Math.round(progress)}%`;

    answersElement.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");

        button.innerHTML = `
            <span class="answer-letter">
                ${letters[index]}
            </span>

            <span>${answer}</span>
        `;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersElement.appendChild(button);
    });

    // Restore previously selected answer
    if (userAnswers[currentQuestion] !== null) {

        const selected =
            userAnswers[currentQuestion];

        showAnswerState(selected);
    }

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {
        nextBtn.innerHTML = "Finish ✓";
    } else {
        nextBtn.innerHTML = "Next →";
    }
}


// =============================
// SELECT ANSWER
// =============================

function selectAnswer(index) {

    // Prevent changing answer
    // after selecting
    if (userAnswers[currentQuestion] !== null) {
        return;
    }

    userAnswers[currentQuestion] = index;

    if (index === questions[currentQuestion].correct) {
        score += 10;
        scoreElement.textContent = score;
    }

    showAnswerState(index);
}


// =============================
// ANSWER FEEDBACK
// =============================

function showAnswerState(selectedIndex) {

    const buttons =
        document.querySelectorAll(".answer");

    const correctIndex =
        questions[currentQuestion].correct;

    buttons.forEach((button, index) => {

        button.classList.add("disabled");

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            index !== correctIndex
        ) {
            button.classList.add("wrong");
        }
    });
}


// =============================
// NEXT BUTTON
// =============================

nextBtn.addEventListener("click", () => {

    // Don't move forward without answer
    if (userAnswers[currentQuestion] === null) {

        alert("Please select an answer first.");

        return;
    }

    if (currentQuestion === questions.length - 1) {

        showResult();

        return;
    }

    currentQuestion++;

    showQuestion();
});


// =============================
// PREVIOUS BUTTON
// =============================

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();
    }
});


// =============================
// SHOW RESULT
// =============================

function showResult() {

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    const correctAnswers =
        userAnswers.filter(
            (answer, index) =>
                answer === questions[index].correct
        ).length;

    const wrongAnswers =
        questions.length - correctAnswers;

    const accuracy =
        Math.round(
            (correctAnswers / questions.length) * 100
        );

    document.getElementById("final-score")
        .textContent = score;

    document.getElementById("correct-count")
        .textContent = correctAnswers;

    document.getElementById("wrong-count")
        .textContent = wrongAnswers;

    document.getElementById("accuracy")
        .textContent = `${accuracy}%`;

    const message =
        document.getElementById("result-message");

    if (accuracy === 100) {
        message.textContent =
            "Perfect score! You absolutely nailed it.";
    }
    else if (accuracy >= 80) {
        message.textContent =
            "Excellent work! You really know your stuff.";
    }
    else if (accuracy >= 60) {
        message.textContent =
            "Good job! A little more practice and you'll ace it.";
    }
    else if (accuracy >= 40) {
        message.textContent =
            "Not bad! Keep learning and give it another shot.";
    }
    else {
        message.textContent =
            "Keep practicing. You'll get better with every attempt!";
    }
}


// =============================
// RESTART
// =============================

restartBtn.addEventListener("click", () => {

    resultScreen.classList.remove("active");

    startScreen.classList.add("active");
});


// =============================
// KEYBOARD SUPPORT
// =============================

document.addEventListener("keydown", (event) => {

    if (!quizScreen.classList.contains("active")) {
        return;
    }

    // Number keys 1-4
    if (["1", "2", "3", "4"].includes(event.key)) {

        const index = Number(event.key) - 1;

        if (userAnswers[currentQuestion] === null) {
            selectAnswer(index);
        }
    }

    // Arrow right
    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    // Arrow left
    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
});