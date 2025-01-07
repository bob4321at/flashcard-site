let question = document.getElementById("question")

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

async function updateUi() {
  let prompt = await getQuestion()

  question.innerHTML = prompt.Question
}

