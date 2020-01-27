export function add<T>(arr: T[], item: T) {
  if (arr.indexOf(item) > -1) {
    return
  }
  arr.push(item)
}
