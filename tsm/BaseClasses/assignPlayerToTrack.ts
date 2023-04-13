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

    push() {
        activeDiff().customData.customEvents.push(this.json)
    }
}