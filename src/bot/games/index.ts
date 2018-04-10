import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Observer } from 'rxjs/Observer'
import { Player } from 'Bot/group'
import { remove } from 'Utilities'

export interface Game {
    title: string
    description: string
    time: Date
    group?: Observer<Array<Player>>
}

export function createCampaign(){
    var _games: Array<Game>
    var _games$: Subject<Array<Game>> = new Subject()
    return {
        addGame: function(game: Game) {
            _games.push(game)
            _games$.next(_games)
        },
        removeGame: function(game: Game) {
            remove(_games, game)
            _games$.next(_games)
        },
        getGames: function() {
            return Observable.from(_games$)
        }
    }
}
