export default function writeJSON(fileStream, iterator) {
  fileStream.write('{')
  let i = iterator.next()
  while (!i.done) {
    fileStream.write(`"${i.value.id}": ${JSON.stringify(i.value, null, 2)}`)
    i = iterator.next()
    if (!i.done) fileStream.write(',')
  }
  fileStream.write('}')
  fileStream.end()
}
