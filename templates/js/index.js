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

let chart = []

chart.push({
  key: "on",
  value: true
})
chart.push({
  key: "off",
  value: false
})

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

document.getElementById("send").onclick = function () {
  let add_question = document.getElementById("add question").value
  let answer_one = {Text: document.getElementById("answer 1").value, R_Or_W: document.getElementById("add wor 1").checked}
  let answer_two= {Text: document.getElementById("answer 2").value, R_Or_W: document.getElementById("add wor 2").checked}
  let answer_three= {Text: document.getElementById("answer 3").value, R_Or_W: document.getElementById("add wor 3").checked}
  let answer_four= {Text: document.getElementById("answer 4").value, R_Or_W: document.getElementById("add wor 4").checked}
  fetch("/test", {
    "method": "POST",
    "body": JSON.stringify({ Question: add_question, Answer: [answer_one, answer_two, answer_three, answer_four] })
  })
  console.log({ Question: add_question, Answer: [answer_one, answer_two, answer_three, answer_four] })
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

