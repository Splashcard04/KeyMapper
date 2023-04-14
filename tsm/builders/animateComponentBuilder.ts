import { activeDiff } from '../map.ts'
import { Json, Vec1Keyframes } from '../types.ts'

export class animateComponentBuilder {
    json: Json = {
        b: 0,
        t: "AnimateComponent",
        d: {}
    }
    private config: Json = {}
    constructor(time?: number, track?: string) { 
        this.json.b = time ?? 0; 
        if(track) this.json.d.track = track; this.config.track = track
        return this 
    }

    attenuation(attenuation: Vec1Keyframes) { 
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { attenuation: attenuation }
        else this.json.d.BloomFogEnvironment.attenuation = attenuation
        return this
    }

    offset(offset: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { offset: offset }
        else this.json.d.BloomFogEnvironment.offset = offset
        return this
    }

    startY(startY: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { startY: startY }
        else this.json.d.BloomFogEnvironment.startY = startY
        return this
    }

    height(height: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { height: height }
        else this.json.d.BloomFogEnvironment.height = height
        return this
    }

    alphaMultiplier(multiplier: Vec1Keyframes) {
        if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { colorAlphaMultiplier: multiplier }
        else this.json.d.TubeBloomPrePassLight.colorAlphaMultiplier = multiplier
        return this
    }

    bloomIntensityMultiplier(multiplier: Vec1Keyframes) {
        if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { bloomFogIntensityMultiplie: multiplier }
        else this.json.d.TubeBloomPrePassLight.bloomFogIntensityMultiplier = multiplier
        return this
    }

    /**represent the custom event as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.customEvents.push(this.json)
        if(this.config.track) {
            activeDiff().customData.environment.push({"id":"[0]Environment","lookupMethod":"EndsWith","track":this.config.track})
        }
    }
}
