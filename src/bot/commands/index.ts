import * as Rx from 'rxjs/Rx'

export interface Command {
    name: string
    instruction: string
    action: Function
}

var _commands: Array<Command> = []

export function addCommand(command: Command){
    _commands.push(command)
}
export function removeCommand(command: Command){
    remove(_commands, command)
}

export function getCommands(){
    return Rx.Observable.from(_commands)
}

function remove(arr: Array<any>, item: Command){
    arr.splice(arr.indexOf(item), 1)
}