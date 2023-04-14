import { Json } from '../types.ts'
import { activeDiff } from '../map.ts'

export class assignPlayerTrackBuilder {
    json: Json = {
        b: 0,
        t: "AssignPlayerToTrack",
        d: {}
    }

    /**
     * Create an 'assignPlayerToTrack' custom event
     * @param { number } time the time to assign the player to the specified track
     * @param { string } track the track to assign the player to
     */
    constructor(time?: number, track?: string) {
        this.json.b = time ?? 0
        this.json.d.track = track ?? "track"
    }

    /**the time to assign the player to the track */
    time(time: number) { this.json.b = time; return this }
    /**the track to assign the player to */
    track(track: string) { this.json.d.track = track; return this }

    /**returns the assign player to track event in json form */
    toJson() { return this.json as Json }

    /**push the event to the output file */
    push() {
        activeDiff().customData.customEvents.push(this.json)
        return this
    }
}