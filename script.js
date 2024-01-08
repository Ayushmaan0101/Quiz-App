document.addEventListener('DOMContentLoaded', function () {
  let questionCount = 1;
  let currentQuestionIndex = 0;
  let questions = [];
  let optionsContainer;
  let unansweredQuestions = [];
  let optionSelected = false;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  // Fetching questions from the API
  async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple');
    const data = await response.json();
    questions = data.results;
    showQuestion();
    startTimer();
  }

  // Displaying the current question
  function showQuestion() {
    resetTimer();
    optionSelected = false;

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('QuestionCount').innerText = `Question: ${questionCount}/10`;
    document.getElementById('Question').innerHTML = currentQuestion.question; 

    optionsContainer = document.getElementById('Options');
    optionsContainer.innerHTML = '';

    const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    allOptions.sort(() => Math.random() - 0.5);

    allOptions.forEach((option, index) => {
      const optionElement = document.createElement('p');
      optionElement.id = index + 1;
      optionElement.className = 'mb-3 p-2 mx-3 rounded-md bg-slate-200 hover:bg-slate-300';
      optionElement.innerHTML = `${String.fromCharCode(65 + index)}. ${option}`; 

      optionElement.dataset.correct = (option === currentQuestion.correct_answer).toString();

      optionElement.addEventListener('click', function (event) {
        if (!optionSelected) {
          optionSelected = true;
          checkAnswer(event);
        }
      });

      optionsContainer.appendChild(optionElement);
    });
  }

  // Checking if the selected option is correct
  function checkAnswer(event) {
    stopTimer();
    const selectedOption = event.target;
    const isCorrect = selectedOption.dataset.correct === 'true';

    selectedOption.style.backgroundColor = isCorrect ? '#86EFAC' : '#FCA5A5';

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
      const correctOption = Array.from(optionsContainer.children)
        .find(option => option.dataset.correct === 'true');
      correctOption.style.backgroundColor = '#86EFAC';
    }

    setTimeout(nextQuestion, 3000);
  }

  // Move to the next question
  function nextQuestion() {
    questionCount++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
      startTimer();
    } else {
      displayResults();
    }
  }

  // Countdown timer functions
  const timer = document.getElementById('Timer');
  let countdown;

  function startTimer() {
    countdown = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    let time = parseInt(timer.textContent);

    if (time > 0) {
      time--;
      timer.textContent = time;

      // Update background color based on remaining time
      updateTimerColor(time);
    } else {
      if (!optionSelected) {
        unansweredQuestions.push(currentQuestionIndex + 1);
        unattemptedCount++;
        stopTimer();
        nextQuestion(); // Moving to the next question 
        return; // Exiting the function for preventing further execution
      }
    }
  }

  function stopTimer() {
    clearInterval(countdown);
  }

  function resetTimer() {
    timer.textContent = 15;
    updateTimerColor(15); 
  }

  function updateTimerColor(time) {
    if (time >= 8) {
      timer.style.backgroundColor = '#86EFAC'; 
    } else if (time >= 4) {
      timer.style.backgroundColor = '#FCD34D'; 
    } else {
      timer.style.backgroundColor = 'red'; 
    }
  }

  // Fetching questions when the page loads
  fetchQuestions();

  // Content After Quiz Completed
  function displayResults() {
    document.getElementById('container').classList.add('hidden');
    document.getElementById('scoreboard').classList.remove('hidden');
    let Meme = document.getElementById('Meme')

    document.getElementById('correctcount').textContent = `Correct: ${correctCount}`;
    document.getElementById('incorrectcount').textContent = `Incorrect: ${incorrectCount}`;
    document.getElementById('unattemptedcount').textContent = `Unattempted: ${unattemptedCount}`;

    // Displaying Meme
    if (correctCount == 0){
      Meme.src = 'videos/Khali Meme.mp4'
    } else if (correctCount == 1){
      Meme.src = 'videos/Ashneer Meme.mp4'
    } else if (correctCount == 2){
      Meme.src = 'videos/Skeleton Meme.mp4'
    } else if (correctCount == 3){
      Meme.src = 'videos/Sudhar Jao Meme.mp4'
    } else if (correctCount == 4){
      Meme.src = 'videos/Breaking Bad Meme.mp4'
    } else if (correctCount == 5){
      Meme.src = 'videos/Bheede Meme.mp4'
    } else if (correctCount == 6){
      Meme.src = 'videos/Sigma Meme.mp4'
    } else if (correctCount == 7){
      Meme.src = 'videos/Cillian Murphy Meme.mp4'
    } else if (correctCount == 8){
      Meme.src = 'videos/Chipi Chipi Cat Meme.mp4'
    } else if (correctCount == 9){
      Meme.src = 'videos/BALLE BALLE TE SHAVA SHAVA Meme.mp4'
    } else if (correctCount == 10){
      Meme.src = 'videos/Papa hoon Meme.mp4'
    }
  }
});
