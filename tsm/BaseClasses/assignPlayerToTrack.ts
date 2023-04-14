import { activeDiff } from "../map.ts";
import { Json } from "../types.ts";

type assignPlayerToTrackType = {
    time?: number,
    track?: string
}

export class assignPlayerToTrack {
    json: Json = {
        b: 0,
        t: "AssignPlayerToTrack",
        d: {}
    }
    
    constructor(x: assignPlayerToTrackType) {
        this.json.b = x.time ?? 0
        this.json.d.track = x.track ?? "track"
    }

    /**returns the assign player to track event in json form */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.customEvents.push(this.json)
    }
}