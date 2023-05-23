import { activeDiff } from "../map.ts";
import { Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4 } from "../types.ts";

type arcType = {
    time?: number,
    type?: 1 | 2,
    x: number,
    y: number,
    cutDirection?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    tailTime?: number,
    tailX?: number,
    tailY?: number,
    tailDirection?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,

    color?: Vec4,
    track?: string,
    njs?: number,
    timeOffset?: number,
    rotation?: Vec3,
    localRotation?: Vec3,
    scale?: Vec3,
    interactable?: boolean,
    position?: Vec2,

    animatePosition?: Vec3Keyframes,
    animateDefinitePosition?: Vec3Keyframes,
    animateDissolve?: Vec1Keyframes,
    animateDissolveArrow?: Vec1Keyframes,
    animateScale?: Vec3Keyframes,
    animateColor?: Vec4
    animateRotation?: Vec3Keyframes,
    animateLocalRotation?: Vec3Keyframes
}

export class Arc {
    json: Json = {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        mu: 0,
        tb: 0,
        tx: 0,
        ty: 0,
        tc: 0,
        tmu: 0,
        m: 0,
        customData: {
            animation: {}
        }
    }

    constructor(x: arcType) {
        this.json.b = x.time ?? 0
        this.json.c = x.type ?? 0
        this.json.x = x.x ?? 0
        this.json.y = x.y ?? 0
        this.json.d = x.cutDirection ?? 0
        this.json.tb = x.tailTime ?? 0
        this.json.tx = x.tailX ?? 0
        this.json.ty = x.tailY ?? 0
        this.json.tc = x.tailDirection ?? 0

        this.json.customData.color = x.color
        this.json.customData.track = x.track
        this.json.customData.noteJumpMovementSpeed = x.njs
        this.json.customData.noteJumpStartBeatOffset = x.timeOffset
        this.json.customData.worldRotation = x.rotation
        this.json.customData.localRotation = x.localRotation
        this.json.customData.size = x.scale
        this.json.customData.uninteractable = !x.interactable
        this.json.customData.coordinates = x.position

        this.json.customData.animation.position = x.animatePosition
        this.json.customData.animation.adefinitePosition = x.animateDefinitePosition
        this.json.customData.animation.dissolve = x.animateDissolve
        this.json.customData.animation.dissolveArrow = x.animateDissolveArrow
        this.json.customData.animation.scale = x.animateScale
        this.json.customData.animation.color = x.animateColor
        this.json.customData.animation.worldRotation = x.animateRotation
        this.json.customData.animation.localRotation = x.animateLocalRotation

        return this
    }

    toJson() { return this.json as Json }

    push() {
        activeDiff().sliders.push(this.json)
    }

}