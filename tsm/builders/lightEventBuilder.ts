import { activeDiff } from "../main.ts";
import { Json, Vec4, lightTypeType } from "../types.ts";

export class lightEventBuilder {
    json: Json = {
        b: 0,
        et: 0,
        i: 1,
        f: 1.0,
        customData: {}
    }
    private config: Json = {}
    /**create a light event to light any laser in your map */
    constructor(time?: number) {
        this.json.b = time ?? 0
        return this
    }

    /**set the type (light lane) to target */
    type(type: lightTypeType) {
        this.json.et = type;
        return this;
    }

    /**set the light group to off */
    off() { this.json.i = 0; return this }
    /**set the light group to on */
    on() { this.json.i = 1; return this }
    /**fade the light group */
    fade() { this.json.i = 3; return this }

    color(color: Vec4) { this.json.customData.color = color; return this }
    lightID(id: number | number[]) { this.json.customData.lightID = id; return this }

    /**return's the light event as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().basicBeatmapEvents.push(this.json)
        return this
    }

}
