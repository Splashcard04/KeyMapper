import { activeDiff } from "../map";
import { Json } from "../types";
import { animateTrack } from "./animateTrack.ts";
import { Environment } from "./Environment.ts";
import { Geometry } from "./Geometry.ts";
import { Wall } from "./Wall.ts";

type modelSettings = {
    object: Geometry | Environment,
    path: string,
    primaryTrackGroups: { track: string, object: Geometry | Environment }[]
}

export class Model {
    constructor(public settings: modelSettings) {
        this.settings = settings
        return this
    }

    static() {
        if(!this.settings.primaryTrackGroups) {
            JSON.parse(Deno.readTextFileSync(this.settings.path+".rmmodel")).objects.forEach((x: Json) => {
                const object = JSON.parse(`${this.settings.object.toJson()}`)
                object.position = x.pos
                object.localRotation = x.rot
                object.scale = x.scale
                activeDiff().environment.push(object)
            })
        } else {
            this.settings.primaryTrackGroups.forEach(a => {
                JSON.parse(Deno.readTextFileSync(this.settings.path+".rmmodel")).objects.forEach((x: Json) => {
                    if(x.track == a.track) {
                        const object = JSON.parse(`${a.object.toJson()}`)
                        object.position = x.pos
                        object.localRotation = x.rot
                        object.scale = x.scale
                        activeDiff().environment.push(object)
                    } else {
                        const object = JSON.parse(`${this.settings.object.toJson()}`)
                        object.position = x.pos
                        object.localRotation = x.rot
                        object.scale = x.scale
                        activeDiff().environment.push(object)
                    }
                })
            })
        }
    }
}