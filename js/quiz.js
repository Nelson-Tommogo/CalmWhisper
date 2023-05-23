const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const backButton = document.getElementById('back-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart' 
    backButton.innerText = 'Back'
    startButton.classList.remove('hide')
    backButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is Mental Health',
    answers: [
      { text: 'Absence of Mental Disorder', correct: false },
      { text: 'Important for specific people', correct: false },
      { text: 'refers to a person emotional, psychological, and social well-being', correct: true },
      { text: 'Not related to well being of a person', correct: false }
    ]
  },
  {
    question: 'What are some common signs of mental health problems?',
    answers: [
      { text: 'persistent feelings of sadness or hopelessness, significant changes in appetite or sleep patterns, withdrawal from activities or social interactions, extreme mood swings, difficulty concentrating or making decisions, excessive worry or anxiety, changes in energy levels, thoughts of self-harm or suicide, and unexplained physical ailments.'
      , correct: true },
      { text: 'Low intelligence', correct: false },
      { text: 'Sign of weakness', correct: false },
      { text: 'Lack of Will-power', correct: false }
    ]
  },
  {
    question: 'How can I support someone who is experiencing a mental health issue?',
    answers: [
      { text: 'providing non-judgmental and empathetic listening, offering reassurance and emotional support', correct: true },
      { text: 'None', correct: false }
    ]
  },
  {
    question: 'Are psychopaths mentally disabled?',
    answers: [
      { text: 'No, psychopathy is not considered a mental disability.', correct: true },
      { text: 'Yes', correct: false }
    ]
  },
  {
    question: 'How can stress affect mental health?',
    answers: [
      { text: 'Stress does not affect anyone', correct: false },
      { text: 'People are just born stressed', correct: false },
      { text: 'Theres no stress', correct: false },
      { text: ' It can contribute to the development or exacerbation of mental health conditions such as anxiety and depression. Prolonged stress can affect cognitive function, disrupt sleep patterns, impair decision-making abilities, and lead to physical symptoms such as headaches or stomachaches.', correct: true }
    ]
  },
  {
    question: 'When should I seek professional help for mental health concerns?',
    answers: [
      { text: 'It is important to seek professional help for mental health concerns when symptoms persist, worsen, or significantly interfere with daily functioning and well-being', correct: true },
      { text: 'When am feeling well', correct: false },
      { text: 'When am lonely', correct: false },
      { text: 'When i need a girlfriend', correct: false }
    ]
  }
]