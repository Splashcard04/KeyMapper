import { file } from './map'
import { json, Vec3 } from './types'

export class Geometry {
    json: json = { "geometry": {}, }

    constructor(type: "Cube" | "Sphere", shader: string | {}) {
        this.json.geometry.type = type
        this.json.material.shader = shader
    }

    scale(scale: Vec3) { this.json.scale = scale }
    position(pos: Vec3) { this.json.position = pos }
}