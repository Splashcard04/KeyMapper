import { activeDiff } from '../map.ts'
import { Json, Vec3Keyframes, Vec1Keyframes, Vec4Keyframes } from '../types.ts'



export class pointDefinitionBuilder {
    private config: Json = {}

    constructor(name: string) { this.config.name = name; return this }

    keyframes(keyframes: Vec1Keyframes | Vec3Keyframes | Vec4Keyframes) { this.config.keyframes = keyframes; return this }
    push() {
        activeDiff().customData.pointDefinitions[this.config.name] = this.config.keyframes ?? [[0,0],[0,1]]
    }
}