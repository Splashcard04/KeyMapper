import { activeDiff } from '../src/map.ts'
import { Json, Vec3 } from '../src/types.ts'

type lookup = "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith"

type envType = {
    id?: string,
    lookup?: "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith",
    position?: Vec3,
    rotation?: Vec3,
    localRotation?: Vec3,
    active?: boolean,
    scale?: Vec3,
    track?: string,
    lightID?: number,
    lightType?: number
}

export namespace Environment {
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

    export class Environment {
        json: Json = {}
    
        constructor(x: envType) {
            this.json.id = x.id ?? "Environment"
            this.json.lookup = x.lookup ?? "Contains"
            this.json.position = x.position
            this.json.rotation = x.rotation
            this.json.localRotation = x.localRotation
            this.json.scale = x.scale
            this.json.track = x.track
            if(!this.json.components.ILightWithId) this.json.components.ILightWithId = { lightID: x.lightID ?? 0 }
            else this.json.components.ILightWithId.lightID = x.lightID
            if(!this.json.components.ILightWithType) this.json.components.ILightWithType = { lightType: x.lightType ?? 0 }
            else this.json.components.ILightWithType.lightType = x.lightType
        }
    
        /**returns the environment object as json */
        toJson() { return this.json as Json }
    
        push() {
            activeDiff().customData.environment.push(this.json)
        }
    }
}
