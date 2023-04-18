import { animateTrackBuilder } from "../../builders/animateTrackBuilder";
import { assignPlayerTrackBuilder } from "../../builders/assignPlayerToTrackBuilder";
import { Json } from "../../types";
import { log } from '../../general.ts'

export class playerAnimationBuilder {
    d: Json = {}
    constructor(public time?: number, public timeEnd?: number, public forTrack?: (x: animateTrackBuilder) => void) {
        this.d.time = time ?? 0
        this.d.timeEnd = timeEnd ?? 10
        this.d.duration = this.d.timeEnd - this.d.time ?? 10
    }

    push() {
        if(this.forTrack) {
            const trackVal = Math.random() * 10 - Math.random()
            const track = new animateTrackBuilder(trackVal.toString(), this.time, this.timeEnd)
            this.forTrack(track)
            track.push()

            new assignPlayerTrackBuilder(this.time, trackVal.toString()).push()
        } else {
            log(`No modifications were provided for track at ${this.time}, the player was not assigned to a track`, "warn")
        }
    }
}