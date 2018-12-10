export function remove<T>(arr: T[], item: T) {
    return arr.splice(arr.indexOf(item), 1)
}
