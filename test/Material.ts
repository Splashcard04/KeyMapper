import { activeDiff } from '../map.ts'
import { shader, Vec4 } from '../types.ts'

type MaterialType = {
    name: string
    shader?: shader,
    color?: Vec4,
    shaderKeywords?: [],
    track?: string
}

export namespace Material {

    export class Builder {
        json: Record<string, any> = {
            shader: "Standard"
        }

        private config: Record<string, any> = {}
        constructor(name: string) { this.config.name = name; return this }

        shader(shader: shader) { this.json.shader = shader; return this }
        color(color: Vec4) { this.json.color = color; return this }
        shaderKeywords(shaderKeywords: string[]) { this.json.shaderKeywords = shaderKeywords; return this }
        track(track: string) { this.json.track = track }

        /**returns the created material as json */
        toJson() { return this.json as Record<string, any> }
        
        push() {
            activeDiff().customData.materials[this.config.name] = this.json
            return this
        }
    }
    
    export class Json {
        json: Record<string, any> = {}
        config: Record<string, any> = {}
        constructor(x: MaterialType) {
            this.config.name = x.name
            this.json.shader = x.shader ?? "Standard"
            this.json.color = x.color
            this.json.shaderKeywords = x.shaderKeywords
            this.json.track = x.track
        }
    
        /**returns the created material as json */
        toJson() { return this.json as Json }
    
        push() {
            activeDiff().customData.materials[this.config.name] = this.json
            return this
        }
    }
}