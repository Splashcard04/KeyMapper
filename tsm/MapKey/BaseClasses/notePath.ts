import { animateTrackBuilder } from "../../builders/animateTrackBuilder.ts";
import { notesBetween } from "../../main";
import { activeDiff } from "../../map.ts";
import { Json } from '../../types.ts'

export class notePath {
    d: {
        time: number,
        timeEnd: number,
        trackL: string,
        trackR: string,
        d: {}
    }
    constructor(x: {
        time: number,
        timeEnd: number,
        left: (x: animateTrackBuilder) => void,
        right: (x: animateTrackBuilder) => void,
    }) {
        this.d.trackL = `${Math.floor(Math.random() * 100) - 50 * Math.random()}`
        this.d.time = x.time
        this.d.timeEnd = x.timeEnd

        const track = new animateTrackBuilder(this.d.trackL, x.time, x.timeEnd-x.time)
        x.left(track)

        this.d.d = track.toJson()
    }

    push() {    
        activeDiff().customData.customEvents.push(this.d.d)
        notesBetween(this.d.time, this.d.timeEnd, x => {
            if(x.toJson().x == 1 || x.toJson().x ==0) {
                x.track(this.d.trackL)
            } else {
                x.track(this.d.trackR)
            }
        })
    }
}
