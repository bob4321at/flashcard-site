let start_button = document.getElementById("start")

start_button.onclick = function() {
  document.getElementById("start").hidden = true
  game.hidden = false
  updateGame()
}

let game = document.getElementById("game")
let question = document.getElementById("question")
let answers = document.getElementById("anwsers")

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

async function updateGame() {
  let prompt = await getQuestion()

  question.innerHTML = prompt.Question

  answers.children[0].innerHTML = prompt.Answer[0].Text
  answers.children[1].innerHTML = prompt.Answer[1].Text
  answers.children[2].innerHTML = prompt.Answer[2].Text
  answers.children[3].innerHTML = prompt.Answer[3].Text

    answers.children[0].onclick = function() {
      if (right_or_wrong[0] == true) {
        alert("correct")
      }else {
        alert("wrong")
      }
    }
    answers.children[1].onclick = function() {
      if (right_or_wrong[1] == true) {
        alert("correct")
      }else {
        alert("wrong")
      }
    }
    answers.children[2].onclick = function() {
      if (right_or_wrong[2] == true) {
        alert("correct")
      } else {
        alert("wrong")
      }
    }
    answers.children[3].onclick = function() {
      if (right_or_wrong[3] == true) {
        alert("correct")
      } else {
        alert("wrong")
      }
    }

  right_or_wrong[0] = prompt.Answer[0].R_Or_W
  right_or_wrong[1] = prompt.Answer[1].R_Or_W
  right_or_wrong[2] = prompt.Answer[2].R_Or_W
  right_or_wrong[3] = prompt.Answer[3].R_Or_W
}

