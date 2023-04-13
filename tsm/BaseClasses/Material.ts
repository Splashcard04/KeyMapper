import { activeDiff } from "../map.ts";
import { Json, shader, Vec4 } from "../types.ts";

type MaterialType = {
    name: string
    shader?: shader,
    color?: Vec4,
    shaderKeywords?: [],
    track?: string
}

export class Material {
    json: Json = {}
    private config: Json = {}
    constructor(x: MaterialType) {
        this.config.name = x.name
        this.json.shader = x.shader ?? "Standard"
        this.json.color = x.color
        this.json.shaderKeywords = x.shaderKeywords
        this.json.track = x.track
    }

    push() {
        activeDiff().customData.materials[this.config.name] = this.json
        return this
    }
}