import { animateTrackBuilder } from "../builders/animateTrackBuilder";
import { activeDiff } from "../map";
import { Json } from "../types";
import { Environment } from "./Environment.ts";
import { Geometry } from "./Geometry.ts";

type modelSettings = {
    object: Geometry | Environment,
    path: string,
    primaryTrackGroups: { track: string, object: Geometry | Environment }[]
}

export class Model {
    config: Json = {}
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

    animate(...switches: [string, number, number][]) {
        switches.forEach(x => {
            const file = JSON.parse(Deno.readTextFileSync(x[0]+'.rmmodel'))

            file.objects.forEach((y: Json) => {


                    const hash = [Math.floor(Math.random() * 10) * 15 - Math.floor(Math.random() * -3)].toString()

                    new animateTrackBuilder(`Model${hash}`, x[1], x[2])
                    .position([[-9999, -9999, -9999, -0.0001], y.pos, [-9999, -9999, -9999, 1.000001]])
                    .localRotation(y.rot)
                    .scale(y.scale)
                    .push()

                    this.settings.primaryTrackGroups.forEach(z => {
                        if(z.track == y.track) {
                            const obj = z.object.toJson()
                            obj.position = y.pos
                            obj.localRotation = y.rot
                            obj.scale = y.scale
                            obj.track = `Model${hash}`
                            activeDiff().cutomData.environment.push(obj)
                        } else {
                            const obj = this.settings.object.toJson()
                            obj.position = y.pos
                            obj.localRotation = y.rot
                            obj.scale = y.scale
                            obj.track = `Model${hash}`
                            activeDiff().cutomData.environment.push(obj)
                        }
                    })

                
            })
        })
    }
}
