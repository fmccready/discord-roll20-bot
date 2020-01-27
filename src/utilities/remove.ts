export function removeById<T extends WithId>(arr: T[], item: T) {
  return arr.filter(a => a.id !== item.id)
}
interface WithId {
  id: string
}
