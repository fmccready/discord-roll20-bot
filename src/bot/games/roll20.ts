import { createCampaign } from './index'
import { createGroup } from '../group/index'

var roll20 = createCampaign();

var date = new Date();

date.setMonth(4)
date.setFullYear(2018)
date.setDate(8)
date.setHours(10)
date.setMinutes(0)
date.setSeconds(0)

roll20.addGame({
    title: '',
    description: '',
    time: date
})

export default () => roll20.getGames()
