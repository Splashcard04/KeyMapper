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
    }

    push() {
        activeDiff().customData.environment.push(this.json)
    }
}
