var form = document.getElementsByTagName('form')[0]

form.onsubmit = function(event) {
  event.preventDefault()

  const inputs = form.getElementsByTagName('input')
  const data = serialize(inputs)

  fetch('/message', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then(response => {
    console.log(
      response.json().then(res => {
        console.log(res)
      })
    )
  })
}

function serialize(data) {
  const serializedData = []
  for (let i = 0; i < data.length; i++) {
    let name = data[i].name
    let value = data[i].value
    serializedData.push({ name, value })
  }
  return serializedData
}
