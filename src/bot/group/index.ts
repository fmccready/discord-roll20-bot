import { Subject } from 'rxjs/Subject'
import { Observer } from 'rxjs/Observer'
import { Observable } from 'rxjs/Observable'
import { add, remove } from 'Utilities'

export interface Player {
    name: string
}

export function createGroup() {
    var _group: Array<Player> = []
    var _group$: Subject<Array<Player>> = new Subject()
    return {
        addPlayer: function(player: Player) {
            add(_group, player)
            return _group$.next(_group)
        },
        removePlayer: function(player: Player) {
            remove(_group, player)
            return _group$.next(_group)
        },
        getGroup: function() {
            return Observable.from(_group$)
        }
    }
}

