export function add(arr: any[], item: any) {
  if (arr.indexOf(item) > -1) {
    return
  }
  arr.push(item)
}
