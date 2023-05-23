import { activeDiff } from "../map.ts";
import { Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4 } from "../types.ts";

type bombType = {
    time?: number,
    fake?: boolean,
    interactable?: boolean,
    position: Vec2,
    color?: Vec4,
    scale?: Vec3,
    rotation?: Vec3,
    localRotation?: Vec3,
    track?: string,
    njs?: number,
    timeOffset?: number,
    animatePosition?: Vec3Keyframes,
    animateDefinitePosition?: Vec3Keyframes,
    animateDissolve?: Vec1Keyframes,
    animateScale?: Vec3Keyframes,
    animateColor?: Vec4
    animateRotation?: Vec3Keyframes,
    animateLocalRotation?: Vec3Keyframes
}

export class Bomb {
    json: Json = {
        b: 0,
        x: 0,
        y: 0,
        customData: {
            animation: {}
        }
    }
    private config: Json = {}
    constructor(x: bombType) {
        this.json.b = x.time ?? 0
        this.json.customData.coordinates = x.position

        this.config.fake = x.fake ?? false
        
        this.json.customData.uninteractable  = !x.interactable ?? false
        this.json.customData.color = x.color
        this.json.customData.worldRotation = x.rotation
        this.json.customData.localRotation = x.localRotation
        this.json.customData.size = x.scale
        this.json.customData.track = x.track
        this.json.customData.noteJumpMovementSpeed = x.njs
        this.json.customData.noteJumpStartBeatOffset = x.timeOffset

        this.json.customData.animation.position = x.animatePosition
        this.json.customData.animation.definitePosition = x.animateDefinitePosition
        this.json.customData.animation.dissolve = x.animateDissolve
        this.json.customData.animation.size = x.animateScale
        this.json.customData.animation.color = x.animateColor
        this.json.customData.animation.worldRotation = x.animateRotation
        this.json.customData.animation.localRotation = x.animateLocalRotation

        
        return this
    }

    toJson() { return this.json as Json }

    push() {
        if(this.config.fake == true) activeDiff().customData.fakeBombNotes.push(this.json)
        else activeDiff().bombNotes.push(this.json)
        return this
    }
}