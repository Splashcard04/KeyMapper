import { activeDiff } from '../map.ts'
import { Json, Vec1Keyframes, Vec3Keyframes, Vec4Keyframes } from '../types.ts'

type pointDefType = {
    name?: string,
    keyframes: Vec1Keyframes | Vec3Keyframes | Vec4Keyframes
}

export class pointDefinition {
    json: Json = {}
    constructor(x: pointDefType) {
        this.json.name = x.name ?? `${Math.random() * 12}`
        this.json.keyframes = x.keyframes
    }

    push() {
        activeDiff().customData.pointDefinition[this.json.name] = this.json.keyframes
    }
}