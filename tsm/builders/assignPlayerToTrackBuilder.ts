import { Json } from '../types.ts'
import { activeDiff } from '../map.ts'

export class assignPlayerTrackBuilder {
    json: Json = {
        b: 0,
        t: "AssignPlayerToTrack",
        d: {}
    }

    constructor(time?: number, track?: string) {
        this.json.b = time ?? 0
        this.json.d.track = track ?? "track"
    }

    time(time: number) { this.json.b = time; return this }
    track(track: string) { this.json.d.track = track; return this }

    /**returns the assign player to track event in json form */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.customEvents.push(this.json)
        return this
    }
}