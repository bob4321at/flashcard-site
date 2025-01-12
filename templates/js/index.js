let start_button = document.getElementById("start")

start_button.onclick = function() {
  document.getElementById("start").hidden = true
  game.hidden = false
  updateGame()
}

let game = document.getElementById("game")
let question = document.getElementById("question")
let answers = document.getElementById("anwsers")
let current_prompt = 0

game.hidden = true

let right_or_wrong = [
  false,
  false,
  false,
  false,
]

async function getQuestion() {
  let test = await fetch("/question", {
    "method": "GET",
  })
  let new_text = test.text()
  new_text = (await new_text).replace(/"/g, '')
  new_text = atob(new_text)
  let object = JSON.parse(new_text)
  console.log(object)

  return object
}

function sendText() {
  test = document.getElementById("input").value
  fetch("/test", {
    "method": "POST",
    "body": JSON.stringify({ Sentance: test })
  })
}

async function updateGame() {
  let prompts = await getQuestion()

  question.innerHTML = prompts.Questions[current_prompt].Question

  answers.children[0].innerHTML = prompts.Questions[current_prompt].Answer[0].Text
  answers.children[1].innerHTML = prompts.Questions[current_prompt].Answer[1].Text
  answers.children[2].innerHTML = prompts.Questions[current_prompt].Answer[2].Text
  answers.children[3].innerHTML = prompts.Questions[current_prompt].Answer[3].Text

    answers.children[0].onclick = function() {
      if (right_or_wrong[0] == true) {
        alert("correct")
        current_prompt += 1
        updateGame()
      }else {
        alert("wrong")
      }
    }
    answers.children[1].onclick = function() {
      if (right_or_wrong[1] == true) {
        alert("correct")
        current_prompt += 1
        updateGame()
      }else {
        alert("wrong")
      }
    }
    answers.children[2].onclick = function() {
      if (right_or_wrong[2] == true) {
        alert("correct")
        current_prompt += 1
        updateGame()
      } else {
        alert("wrong")
      }
    }
    answers.children[3].onclick = function() {
      if (right_or_wrong[3] == true) {
        alert("correct")
        current_prompt += 1
        updateGame()
      } else {
        alert("wrong")
      }
    }

  right_or_wrong[0] = prompts.Questions[current_prompt].Answer[0].R_Or_W
  right_or_wrong[1] = prompts.Questions[current_prompt].Answer[1].R_Or_W
  right_or_wrong[2] = prompts.Questions[current_prompt].Answer[2].R_Or_W
  right_or_wrong[3] = prompts.Questions[current_prompt].Answer[3].R_Or_W
}

