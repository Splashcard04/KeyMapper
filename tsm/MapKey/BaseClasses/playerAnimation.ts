import { animateTrack } from "../../BaseClasses/animateTrack.ts"
import { assignPlayerTrack } from "../../BaseClasses/assignPlayerToTrack.ts"
import { animateTrackBuilder } from "../../builders/animateTrackBuilder"
import { log } from "../../internal.ts"

type playerAnimationType = {
    time?: number,
    timeEnd?: number,
    forTrack?: (x: animateTrackBuilder) => void
}

export class playerAnimation {
    constructor(public x: playerAnimationType) {  }

    push() {
        if(this.x.forTrack) {
            if(!this.x.time) this.x.time = 0
            if(!this.x.timeEnd) this.x.timeEnd = 10
            const trackVal = Math.random() * 10 - Math.random()
            const track = new animateTrackBuilder(trackVal.toString(), this.x.time, this.x.timeEnd)
            this.x.forTrack(track)
            track.push()

            new assignPlayerTrack({ track: trackVal.toString(), time: this.x.time }).push()
        } else {
            log(`No modifications were provided for track at ${this.x.time}, the player was not assigned to a track`, 'warn')
        }
    }
}