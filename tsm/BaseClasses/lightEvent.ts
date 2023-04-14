import { activeDiff } from "../map.ts";
import { Json, Vec4, lightTypeType } from "../types.ts";

type lightEventType = {
    time?: number,
    type?: lightTypeType,
    eventValue?: "on" | "off" | "fade",
    color?: Vec4,
    lightID?: number | mumber[]
}

export class lightEvent {
    json: Json = {
        b: 0,
        et: 0,
        i: 1,
        f: 1.0,
        customData: {}
    }
    constructor(x: lightEventType) {
        this.json.b = x.time ?? 0
        this.json.et = x.type

        if(x.eventValue) {
            if(x.eventValue == "off") this.json.i = 0;
            if(x.eventValue == "on") this.json.i = 1;
            if(x.eventValue == "fade") this.json.i = 3;
        } else this.json.i = 1;

        this.json.customData.color = x.color
        this.json.customData.lightID = x.lightID
    }

    push() {
        activeDiff().basicBeatmapEvents.push(this.json)
        return this
    }
}
