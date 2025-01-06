let question = document.getElementById("question")

async function getQuestion() {
  let test = await fetch("/question", {
    "method": "GET",
  })
  test.text().then(function(text) {
    let new_text = text.replace(/"/g, '')
    new_text = atob(new_text)
    let object = JSON.parse(new_text)
    console.log(object)
  })
}

