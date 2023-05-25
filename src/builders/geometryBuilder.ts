import { activeDiff } from '../map.ts'
import { Json, Vec4, Vec3, shader, shape, materialType } from '../types.ts'

export class geometryBuilder {
    json: Json = {
        geometry: {
            type: "Cube"
        }
    }

    constructor(type?: shape, material?: materialType) {
        this.json.geometry.type = type ?? "Cube"
        this.json.geometry.material = material ?? { shader: "Standard" }
        return this
    }

    track(track: string) { this.json.track = track; return this }
    position(position: Vec3) { this.json.position = position; return this }
    rotation(rotation: Vec3) { this.json.rotation = rotation; return this }
    scale(scale: Vec3) { this.json.scale = scale; return this }
    localPosition(position: Vec3) { this.json.localPosition = position; return this }
    localRotation(rotation: Vec3) { this.json.localRotation = rotation; return this }
    lightID(id: number) { 
        if(!this.json.components) this.json.components = { ILightWithId: { lightID: id }}
        if(this.json.components === {}) this.json.components = { ILightWithId: { lightID: id }}
        else this.json.components.ILightWithId.lightID = id; return this
    }
    lightType(type: number) {
        if(!this.json.components) this.json.components = { ILightWithId: { type: type }}
        if(this.json.components === {}) this.json.components = { ILightWithId: { type: type }}
        else this.json.components.ILightWithId.type = type; return this
    }

    /**returns the geometry object as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.environment.push(this.json)
        return this
    }
}
