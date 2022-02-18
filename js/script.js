// Inicial Data

let currentQuestion = 0
let correctAnswers = 0

showQuestion()

// Events

document.querySelector('.scoreArea button').addEventListener('click', resetEvent)




// Functions
function showQuestion() {
  if(questions[currentQuestion]) {
    // Selecionando a quest atual
    let quest = questions[currentQuestion]

    // Porcentagem da barra de progresso
    let percentage = Math.floor((currentQuestion / questions.length) * 100)
    document.querySelector('.progress--bar').style.width = `${percentage}%`


    // Exibindo as areas de score ou de question
    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    // Exibindo a questão
    document.querySelector('.question').innerHTML = quest.question

    // Exibindo as opções de resposta
    let optionsHtml = ''

    for(let i in quest.options) {
      optionsHtml += `<div data-op="${i}" class="option"> <span>${parseInt(i) + 1}</span>${quest.options[i]} </div>`
    }
    document.querySelector('.options').innerHTML = optionsHtml


    // Evento de click na pergunta
    document.querySelectorAll('.options .option').forEach((item) => {
      item.addEventListener('click', optionClickEvent)
    })

  } else {
    finishQuiz()
  }
}


// Evento de click na resposta correta
function optionClickEvent(event) {
  let clickedOption = parseInt(event.target.getAttribute('data-op'))

  if(questions[currentQuestion].answer === clickedOption) {
    correctAnswers++
  } 

  currentQuestion++
  showQuestion()
}

// Finalizando o Quiz e mostrando os acertos finais
function finishQuiz() {
  // Calculando os pontos que o usuario fez
  let points = Math.floor((correctAnswers / questions.length) * 100)

  if(points < 30) {
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!'
    document.querySelector('.scorePct').style.color = '#FF0000'
  } else if (points >= 30 && points < 70 ) {
    document.querySelector('.scoreText1').innerHTML = 'Bom!'
    document.querySelector('.scorePct').style.color = '#FFFF00'
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Bom!'
    document.querySelector('.scorePct').style.color = '#0D630D'
  }

  // Exibindo os pontos dele na tela em porcentagem
  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`

  // Exibindo a quantidade de perguntas que foram feitas e respostas corretas
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e ${correctAnswers}.`

  // Efeitos de CSS
  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.progress--bar').style.width = `100%`
}

// Recomeçando o Quiz
function resetEvent() {
  correctAnswers = 0
  currentQuestion = 0
  showQuestion()
}


