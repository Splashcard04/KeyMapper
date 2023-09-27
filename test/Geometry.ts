import { activeDiff } from '../src/map.ts'
import { Json, Vec4, Vec3, shader, shape, materialType } from '../src/types.ts'

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

export namespace Geometry {
    export class Builder {
        json: Record<string, any> = {

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

    export class Json {
        json: Record<string, any> = {
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
    
}