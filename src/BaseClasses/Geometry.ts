import { activeDiff } from '../map.ts'
import { Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, shader } from '../types.ts'

type geometryType = {
    type?: "Cube" | "Triangle" | "Quad" | "Cyliner" | "Capsule" | "Sphere",
    material: {
        shader: shader,
        color?: Vec4,
        shaderKeywords?: [],
        track?: ""
    } | string,
    scale?: Vec3,
    position?: Vec3,
    rotation?: Vec3,
    localRotation?: Vec3,
    track?: string,
    lightID?: number,
    lightType?: number
}

export class Geometry {
    json: Json = {
        geometry: {
            material: {}
        }
    }
    constructor(x: geometryType) {
        this.json.geometry.type = x.type ?? "Cube"
        this.json.geometry.material = x.material ?? { shader: "Standard" }
        this.json.scale = x.scale
        this.json.position = x.position
        this.json.rotation = x.rotation
        this.json.localRotation = x.localRotation
        this.json.track = x.track
        if(!this.json.components.ILightWithId) this.json.components.ILightWithId = { lightID: x.lightID ?? 0 }
        else this.json.components.ILightWithId.lightID = x.lightID
        if(!this.json.components.ILightWithType) this.json.components.ILightWithType = { lightType: x.lightType ?? 0 }
        else this.json.components.ILightWithType.lightType = x.lightType
    }

    /**returns the geometry object as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.environment.push(this.json)
    }
}
