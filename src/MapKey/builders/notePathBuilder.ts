import { notesBetween } from '../../general.ts'
import { Json } from '../../types.ts'
import { animateTrackBuilder } from '../../builders/animateTrackBuilder.ts'
import { activeDiff } from '../../map.ts'

export class notePathBuilder {
    private d: {
        time: number,
        timeEnd: number,
        trackL: string
        trackR: string
    }
    constructor(time: number, timeEnd: number, left?: (x:animateTrackBuilder) => void, right?: (x: animateTrackBuilder) => void) {
        this.d.time = time
        this.d.timeEnd = timeEnd

        this.d.trackL = `${Math.floor(Math.random() * 100) - 50 * Math.random()}`
        this.d.trackR = `${Math.floor(Math.random() * 100) - 50 * Math.random()}`

        const trackL = new animateTrackBuilder(this.d.trackL, time, timeEnd-time)
        const trackR = new animateTrackBuilder(this.d.trackR, time, timeEnd-time)

        if(left) {
            left(trackL)
        }
        if(right) {
            right(trackL)
        }
        trackR.push()
        trackL.push()
        
    }

    push() {
        notesBetween(this.d.time, this.d.timeEnd, x => {
            if(x.toJson().x == 0 || x.toJson().x == 1) {
                x.track(this.d.trackL)
            } else {
                x.track(this.d.trackR)
            }
        })
    }

}
