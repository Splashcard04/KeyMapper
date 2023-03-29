import { Json, Vec4, shader } from './types.ts'
import { activeDiff } from './map.ts' 

export class materialBuilder {
    config: Json = {}
    json: Json = {}

    constructor(name: string) {
        this.config.name = name
    }

    shader(shader: shader) { this.json.shader = shader; return this }
    color(color: Vec4) { this.json.color = color; return this }
    shaderKeywords(keywords: []) { this.json.color = color; return this }
    track(track: string) { this.json.track = track; return this }
    push() {
        activeDiff().customData.materials[this.config.name] = this.json
    }
}