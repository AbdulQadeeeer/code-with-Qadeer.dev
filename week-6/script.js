let currentQuestionIndex = 0;
let currentQuiz = [];
let userAnswers = [];
let globalTimer;
let questionTimer;
let globalTimeLeft = 600; // 10 minutes
let questionTimeLeft = 30; // 30 seconds

function updateGlobalTimer() {
    const minutes = Math.floor(globalTimeLeft / 60);
    const seconds = globalTimeLeft % 60;
    document.getElementById('globalTimer').innerText = `Total Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (globalTimeLeft > 0) {
        globalTimeLeft--;
    } else {
        clearInterval(globalTimer);
        showResults();
    }
}

function updateQuestionTimer() {
    const seconds = questionTimeLeft % 60;
    document.getElementById('questionTimer').innerText = `Time Left: ${seconds < 10 ? '0' : ''}${seconds}`;
    if (questionTimeLeft > 0) {
        questionTimeLeft--;
    } else {
        // Auto-select a wrong answer if time runs out
        userAnswers[currentQuestionIndex] = -1; // Mark as wrong answer
        nextQuestion();
    }
}

function startTimers() {
    globalTimer = setInterval(() => {
        updateGlobalTimer();
        updateQuestionTimer();
    }, 1000);
}

function resetQuestionTimer() {
    questionTimeLeft = 30;
}

function loadQuestion() {
    if (globalTimeLeft <= 0) {
        return showResults();
    }
    const questionData = currentQuiz[currentQuestionIndex];
    const questionContainer = document.querySelector('#questionContainer');
    questionContainer.innerHTML = `
        <div class="question">
            ${questionData.question}
            <span id="questionTimer" style="float:right;">Time Left: 30</span>
        </div>
        <div class="choices">
            ${questionData.choices.map((choice, index) => `
                <div>
                    <input type="radio" name="choice" id="choice${index}" value="${index}" ${userAnswers[currentQuestionIndex] == index ? 'checked' : ''}>
                    <label for="choice${index}">${choice}</label>
                </div>`).join('')}
        </div>
    `;
    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.addEventListener('change', (e) => {
            userAnswers[currentQuestionIndex] = parseInt(e.target.value);
        });
    });

    document.getElementById('previousButton').style.display = currentQuestionIndex === 0 ? 'none' : 'block';
    document.getElementById('nextButton').style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'none' : 'block';
    document.getElementById('resultsButton').style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'block' : 'none';
    resetQuestionTimer();
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] == null) {
        alert("Please select an answer before proceeding.");
        return;
    }
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResults() {
    clearInterval(globalTimer);
    clearInterval(questionTimer);
    const questionContainer = document.querySelector('#questionContainer');
    questionContainer.innerHTML = currentQuiz.map((q, index) => `
        <div class="question">
            Question ${index + 1}: 
            <span style="color: ${userAnswers[index] === q.correctAnswer ? 'green' : 'red'}">
                ${q.choices[userAnswers[index]] || 'No answer selected'}
            </span>
        </div>`).join('');
    document.querySelector('.flex').style.display = 'none';
}

function initializeQuiz(quiz) {
    // Clear existing intervals before starting a new quiz
    clearInterval(globalTimer);
    clearInterval(questionTimer);
    
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    userAnswers = new Array(quiz.length).fill(null);
    globalTimeLeft = 600;
    questionTimeLeft = 30;
    loadQuestion();
    document.querySelector('.flex').style.display = 'flex';
    document.getElementById('globalTimer').style.display = 'none';
    document.getElementById('questionTimer').style.display = 'none';
    document.getElementById('startExamButton').style.display = 'block';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('takeQuizBtn').style.marginBottom = '20px';

}

function startExam() {
    // Clear existing intervals before starting the exam
    clearInterval(globalTimer);
    clearInterval(questionTimer);

    document.getElementById('globalTimer').style.display = 'block';
    document.getElementById('questionTimer').style.display = 'block';
    document.getElementById('startExamButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'block';
    startTimers();
}

document.getElementById('htmlQuizButton').addEventListener('click', () => initializeQuiz(htmlQuestions));
document.getElementById('cssQuizButton').addEventListener('click', () => initializeQuiz(cssQuestions));
document.getElementById('jsQuizButton').addEventListener('click', () => initializeQuiz(jsQuestions));
document.getElementById('startExamButton').addEventListener('click', startExam);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.flex').style.display = 'none';
    document.getElementById('globalTimer').style.display = 'none';
    document.getElementById('questionTimer').style.display = 'none';
});
