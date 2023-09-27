import { activeDiff } from '../src/map.ts'
import { Vec3Keyframes, Vec1Keyframes, Vec4Keyframes } from '../src/types.ts'

type pointDefType = {
    name?: string,
    keyframes: Vec1Keyframes | Vec3Keyframes | Vec4Keyframes
}

export namespace PointDefintion {
    export class Builder {
        private config: Record<string, any> = {}
    
        constructor(name: string) { this.config.name = name; return this }
    
        keyframes(keyframes: Vec1Keyframes | Vec3Keyframes | Vec4Keyframes) { this.config.keyframes = keyframes; return this }
    
        push() {
            activeDiff().customData.pointDefinitions[this.config.name] = this.config.keyframes ?? [[0,0],[0,1]]
            return this
        }
    
    }

    export class Json {
        json: Record<string, any> = {}
        constructor(x: pointDefType) {
            this.json.name = x.name ?? `${Math.random() * 12}`
            this.json.keyframes = x.keyframes
        }
    
        push() {
            activeDiff().customData.pointDefinitions[this.json.name] = this.json.keyframes
        }
    }


}