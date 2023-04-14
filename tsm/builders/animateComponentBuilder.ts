import { activeDiff } from '../map.ts'
import { Json, Vec1Keyframes } from '../types.ts'

export class animateComponentBuilder {
    json: Json = {
        b: 0,
        t: "AnimateComponent",
        d: {}
    }
    private config: Json = {}
    /**
     * Create an 'AnimateComponent' custom event 
     * @param { number } time The time to start animating the component(s), duration will apply based on the track you assign
     * @param { string } track The track to animate the component(s) on
    */
    constructor(time?: number, track?: string) { 
        this.json.b = time ?? 0; 
        if(track) { this.json.d.track = track; this.config.track = track }
        else this.json.d.track = "track"; this.config.track = "track"
        return this 
    }
    /**animate the environment's fog attenuation */
    attenuation(attenuation: Vec1Keyframes) { 
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { attenuation: attenuation }
        else this.json.d.BloomFogEnvironment.attenuation = attenuation
        return this
    }
    /**animate the environment's fog offset */
    offset(offset: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { offset: offset }
        else this.json.d.BloomFogEnvironment.offset = offset
        return this
    }
    /**animate the environment's fog starY */
    startY(startY: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { startY: startY }
        else this.json.d.BloomFogEnvironment.startY = startY
        return this
    }
    /**animate the environment's fog height over time */
    height(height: Vec1Keyframes) {
        if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { height: height }
        else this.json.d.BloomFogEnvironment.height = height
        return this
    }
    /**animate the environment's default alpha multiplier for bloom lasers */
    alphaMultiplier(multiplier: Vec1Keyframes) {
        if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { colorAlphaMultiplier: multiplier }
        else this.json.d.TubeBloomPrePassLight.colorAlphaMultiplier = multiplier
        return this
    }
    /**animate the environment's default bloom intensity multiplier*/
    bloomIntensityMultiplier(multiplier: Vec1Keyframes) {
        if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { bloomFogIntensityMultiplie: multiplier }
        else this.json.d.TubeBloomPrePassLight.bloomFogIntensityMultiplier = multiplier
        return this
    }

    /**represent the custom event as json */
    toJson() { return this.json as Json }

    /**push the event to the output difficulty */
    push() {
        activeDiff().customData.customEvents.push(this.json)
        if(this.config.track) {
            activeDiff().customData.environment.push({"id":"[0]Environment","lookupMethod":"EndsWith","track":this.config.track})
        }
    }
}
