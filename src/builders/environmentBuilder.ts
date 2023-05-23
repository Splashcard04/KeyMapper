import { activeDiff } from '../map.ts'
import { Json, Vec3 } from '../types.ts'

type lookup = "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith"

export class environmentBuilder {
    json: Json = {}

    constructor(id?: string, lookup?: lookup) {
        this.json.id = id ?? "Thing"
        this.json.lookupMethod = lookup ?? "Regex"
        return this
    }

    id(id: string) { this.json.id = id; return this }
    lookup(lookup: lookup) { this.json.lookup = lookup; return this }
    duplicate(dupe: number) { this.json.duplicate = dupe; return this }
    active(active: boolean) { this.json.active = active; return this }
    scale(scale: Vec3) { this.json.scale = scale; return this }
    position(position: Vec3) { this.json.position = position; return this }
    rotation(rotation: Vec3) { this.json.rotation = rotation; return this }
    localPosition(position: Vec3) { this.json.localPosition = position; return this }
    localRotation(rotation: Vec3) { this.json.localRotation = rotation; return this }
    track(track: string) { this.json.track = track; return this }
    lightID(id: number) { 
        if(!this.json.components || this.json.components == {}) {
            this.json.components = { ILightWithId: { lightID: id }}
        }
        if(!this.json.components.ILightWithId) this.json.components.ILightWithId = { lightID: id }
        this.json.components.ILightWithId.lightID = id
        return this
    }
    lightType(type: number) {
        if(!this.json.components || this.json.components == {}) {
            this.json.components = { ILightWithId: { type: type }}
        }
        if(!this.json.components.ILightWithId) this.json.components.ILightWithId = { type: type }
        this.json.components.ILightWithId.type = type
        return this
    }

    /**returns the environment object as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.environment.push(this.json)
        return this
    }
}
