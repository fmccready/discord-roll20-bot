export function add(arr: Array<any>, item: any){
    if (arr.indexOf(item) > -1){
        return
    }
    arr.push(item)
}
