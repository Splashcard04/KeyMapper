import { activeDiff } from '../map.ts'
import { Json, Vec3 } from '../types.ts'

type envType = {
    id?: string,
    lookup?: "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith",
    position?: Vec3,
    rotation?: Vec3,
    localRotation?: Vec3,
    scale?: Vec3,
    track?: string,
    lightID?: number,
    lightType?: number
    components: {}
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
}