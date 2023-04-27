import { notesBetween } from '../../general.ts'
import { Json } from '../../types.ts'
import { animateTrackBuilder } from '../../builders/animateTrackBuilder.ts'
import { activeDiff } from '../../map.ts'

export class notePathBuilder {
    private d: {
        time: number,
        timeEnd: number,
        track: string
        d: {}
    }
    constructor(time: number, timeEnd: number, animation: (x: animateTrackBuilder) => void) {
        this.d.time = time
        this.d.timeEnd = timeEnd

        this.d.track = `${Math.floor(Math.random() * 100) - 50 * Math.random()}`

        const track = new animateTrackBuilder(this.d.track, time, timeEnd-time)

        animation(track)

        this.d.d = track.toJson()
    }

    push() {
        activeDiff().customData.customEvents.push(this.d.d)
        notesBetween(this.d.time, this.d.timeEnd, x => {
            x.track(this.d.track)
        })
    }

}
