let playerName;
let currentQuestion = 1;
let correctAnswers = 0;

function startQuiz() {
  playerName = document.getElementById('playerName').value;
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('quizScreen').style.display = 'block';
  showQuestion(currentQuestion);
}

function showQuestion(questionNumber) {
  // Ocultar todas las preguntas y mostrar solo la pregunta actual
  document.querySelectorAll('.question').forEach((question) => {
    question.style.display = 'none';
  });
  document.getElementById(`question${questionNumber}`).style.display = 'block';

  // Actualizar el mensaje de bienvenida con el nombre del jugador
  document.getElementById('welcomeMessage').textContent = `Hola ${playerName}! Responde la pregunta ${questionNumber}:`;

  // Ocultar el botón de "Siguiente pregunta" al mostrar la última pregunta
  if (questionNumber === 3) {
    document.getElementById('nextButton').style.display = 'none';
  } else {
    document.getElementById('nextButton').style.display = 'block';
  }
}

function checkAnswer(questionName) {
  const selectedOption = document.querySelector(`input[name=${questionName}]:checked`);

  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = getCorrectAnswer(questionName);

    if (userAnswer === correctAnswer) {
      selectedOption.parentNode.style.color = 'green';
      correctAnswers++;
    } else {
      selectedOption.parentNode.style.color = 'red';
    }

    // Deshabilitar los radios después de responder
    document.querySelectorAll(`input[name=${questionName}]`).forEach((radio) => {
      radio.disabled = true;
    });
    // Si es la última pregunta, mostrar los resultados
    if (currentQuestion === 3) {
        showResults();
      }
  }
}
  

function getCorrectAnswer(questionName) {
  const correctAnswersMap = {
    q1: 'b',
    q2: 'a',
    q3: 'c',
  };
  return correctAnswersMap[questionName];
}

function showResults() {
  const resultsMessage = `Juego finalizado ${playerName}. Tu puntuación es: ${correctAnswers} respuestas correctas de 3.`;
  alert(resultsMessage);
  document.getElementById('results').textContent = resultsMessage;
  document.getElementById('results').style.display = 'block';

  // Llamar a la función para mostrar el mensaje adicional
  showAdditionalMessage();
}

function showAdditionalMessage() {
  const additionalMessage = `¡Felicidades ${playerName}! Has completado la trivia. ¿Deseas jugar nuevamente?`;
  const playAgain = window.confirm(additionalMessage);
  if (playAgain) {
    restartQuiz();
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion <= 3) {
    showQuestion(currentQuestion);
  } else {
    document.getElementById('nextButton').style.display = 'none';
    showResults();
  }
}

function restartQuiz() {
  playerName = ''; // Vaciar el nombre del jugador
  document.getElementById('playerName').value = ''; // Limpiar el campo de entrada
  document.getElementById('results').style.display = 'none';
  document.querySelectorAll('input[type=radio]').forEach((radio) => {
    radio.disabled = false;
    radio.parentNode.style.color = 'black';
    radio.checked = false; // Desmarcar las opciones seleccionadas previamente
  });
  currentQuestion = 1;
  correctAnswers = 0;
  document.getElementById('nextButton').style.display = 'block';
  document.getElementById('quizScreen').style.display = 'none'; // Ocultar la pantalla de preguntas
  document.getElementById('welcomeScreen').style.display = 'block'; // Mostrar la pantalla de bienvenida
}
