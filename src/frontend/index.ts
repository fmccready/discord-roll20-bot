import * as $ from 'jquery'

var form = document.getElementsByTagName('form')[0]
var message = (<HTMLInputElement>document.getElementById('message')).value
console.log(form)

form.onsubmit = function(event) {
  event.preventDefault()
  const data = $(form).serializeArray()
  $.post({
    url: '/message',
    data: JSON.stringify(data),
    contentType: 'application/json',
  }).then(function(data) {
    console.log(data)
  })
}
