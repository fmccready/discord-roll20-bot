const form = document.getElementsByTagName('form')[0]

form.onsubmit = function(event) {
  event.preventDefault()

  const inputs = form.getElementsByTagName('input')
  const data = serialize(inputs)

  fetch('/message', {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'post',
  }).then(response => {
    console.log(
      response.json().then(res => {
        console.log(res)
      }),
    )
  })
}

function serialize(data) {
  const serializedData = []
  for (const d of data) {
    const name = d.name
    const value = d.value
    serializedData.push({ name, value })
  }
  return serializedData
}
