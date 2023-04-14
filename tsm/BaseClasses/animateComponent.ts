import { activeDiff } from "../map.ts";
import { Json, Vec1Keyframes } from "../types.ts";

type animateComponentType = {
    time?: number,
    track?: string,
    attenuation?: Vec1Keyframes,
    offset?: Vec1Keyframes,
    startY?: Vec1Keyframes,
    height?: Vec1Keyframes,
    alphaMultiplier?: Vec1Keyframes,
    bloomIntensityMultiplier?: Vec1Keyframes
}

export class animateComponent {
    json: Json = {
        b: 0,
        t: "AnimateComponent",
        d: {}
    }
    private config: Json = {}

    constructor(x: animateComponentType) {
        this.json.b = x.time ?? 0;
        this.json.d.track = x.track ?? "track"; this.config.track = x.track ?? "track"

        if(x.attenuation) {
            if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { attenuation: x.attenuation }
            else this.json.d.BloomFogEnvironment.attenuation = x.attenuation
        }
    
        if(x.offset) {
            if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { offset: x.offset }
            else this.json.d.BloomFogEnvironment.offset = x.offset
        }

        if(x.startY) {
            if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { startY: x.startY }
            else this.json.d.BloomFogEnvironment.startY = x.startY
        }

        if(x.height) {
            if(!this.json.d.BloomFogEnvironment) this.json.d.BloomFogEnvironment = { height: x.height }
            else this.json.d.BloomFogEnvironment.height = x.height
        }

        if(x.alphaMultiplier) {
            if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { colorAlphaMultiplier: x.alphaMultiplier }
            else this.json.d.TubeBloomPrePassLight.colorAlphaMultiplier = x.alphaMultiplier
        }

        if(x.bloomIntensityMultiplier) {
            if(!this.json.d.TubeBloomPrePassLight) this.json.d.TubeBloomPrePassLight = { bloomFogIntensityMultiplier: x.bloomIntensityMultiplier }
            else this.json.d.TubeBloomPrePassLight.bloomFogIntensityMultiplier = x.bloomIntensityMultiplier
        }
    }

    /**represent the custom event as json */
    toJson() { return this.json as Json }

    push() {
        activeDiff().customData.customEvents.push(this.json)
        return this
    }
}