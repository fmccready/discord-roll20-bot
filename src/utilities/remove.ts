export function remove<T>(arr: Array<T>, item: T) {
    return arr.splice(arr.indexOf(item), 1)
}
