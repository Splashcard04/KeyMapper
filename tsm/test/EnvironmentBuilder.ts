import { activeDiff } from '../map.js'
import { Json, shader, Vec3 } from '../types.ts'

type lookup = "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith"

type envType = {
    id?: string[] | string,
    lookup?: lookup,
    position?: Vec3,
    rotation?: Vec3,
    localRotation?: Vec3,
    active?: boolean,
    scale?: Vec3,
    track?: string,
    lightID?: number,
    lightType?: number
}

export class EnvironmentBuilder {
    private json: Json = {
        id: "",
        lookupMethod: ""
    }
    private config: Json = {}

    constructor(json: envType) {
        
        this.json.lookupMethod = json.lookup;
        this.json.position = json.position;
        this.json.rotation = json.rotation
        this.json.localRotation = json.localRotation;
        this.json.active = json.active;
        this.json.scale = json.scale;
        this.json.track = json.track;
        this.json.lightID = json.lightID;
        this.json.lightType = json.lightType;
        return this
    }

    id(id: string | string[]) { this.config.id = id; return this }
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
    }
    lightType(type: number) {
        if(!this.json.components || this.json.components == {}) {
            this.json.components = { ILightWithId: { type: type }}
        }
        if(!this.json.components.ILightWithId) this.json.components.ILightWithId = { type: type }
        this.json.components.ILightWithId.type = type
    }

    public toJson(): Json {
        return this.json as Json
    }

    push() {
        if(typeof this.config.id == "string") {
            this.json.id = this.config.id; activeDiff().customData.environment.push(this.json)
        }
        else {
            this.config.id.forEach(id => {
                this.json.id = id; activeDiff().customData.environment.push(this.json)
            })
        }
        
    }
}

