import { activeDiff } from '../map.ts'
import { shader, Json, Vec4 } from '../types.ts'


export class materialBuilder {
    json: Json = {
        shader: "Standard"
    }

    private config: Json = {}
    constructor(name: string) { this.config.name = name; return this }

    shader(shader: shader) { this.json.shader = shader; return this }
    color(color: Vec4) { this.json.color = color; return this }
    shaderKeywords(shaderKeywords: string[]) { this.json.shaderKeywords = shaderKeywords; return this }
    track(track: string) { this.json.track = track }
    
    push() {
        activeDiff().customData.materials[this.config.name] = this.json
    }
}