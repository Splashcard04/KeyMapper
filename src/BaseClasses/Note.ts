import { activeDiff } from "../map.ts";
import { Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4 } from "../types.ts";

type cutDir = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type noteType = {
    time?: number,
    position?: Vec2,
    type?: 1 | 2,
    cutDirection?: cutDir,
    angleOffset?: number,

    fake?: boolean,
    interacatable?: boolean,

    njs?: number,
    timeOffset?: number,
    rotation?: Vec3Keyframes,
    localRotation?: Vec3Keyframes,
    scale?: Vec3Keyframes,
    interactale?: boolean,
    track?: string,
    color?: Vec4,

    animatePosition?: Vec3Keyframes,
    animateDefinitePosition?: Vec3Keyframes,
    animateDissolve?: Vec1Keyframes,
    animateDissolveArrow?: Vec1Keyframes,
    animateScale?: Vec3Keyframes,
    animateColor?: Vec4
    animateRotation?: Vec3Keyframes,
    animateLocalRotation?: Vec3Keyframes

}

export class Note {
    json: Json = {
        b: 0,
        x: 0,
        y: 0,
        c: 0,
        d: 0,
        a: 0,
        customData: {
            animation: {}
        }
    }
    private config: Json = {}
    constructor(x: noteType) {
        this.json.b = x.time ?? 0
        this.json.customData.coordinates = x.position
        this.json.c = x.type ?? 1
        this.json.d = x.cutDirection ?? 0
        this.json.a = x.angleOffset ?? 0

        this.json.customData.noteJumpMovementSpeed = x.njs
        this.json.customData.noteJumpStartBeatOffset = x.timeOffset
        this.json.customData.worldRotation = x.rotation
        this.json.customData.localRotation = x.localRotation
        this.json.customData.size = x.scale
        this.json.customData.uninteractable = !x.interactale
        this.json.customData.track = x.track
        this.json.customData.color = x.color

        this.json.customData.animation.position = x.animatePosition
        this.json.customData.animation.definitePosition = x.animateDefinitePosition
        this.json.customData.animation.dissolve = x.animateDissolve
        this.json.customData.animation.dissolveArrow = x.animateDissolveArrow
        this.json.customData.animation.size = x.animateScale
        this.json.customData.animation.color = x.animateColor
        this.json.customData.animation.worldRotation = x.animateRotation
        this.json.customData.animation.localRotation = x.animateLocalRotation

        this.json.customData.uninteractable = !x.interacatable ?? false
        this.config.fake = x.fake ?? false
        return this
    }

    toJson() { return this.json as Json }

    push() {
        if(this.config.fake == true) activeDiff().customData.fakeColorNotes.push(this.json)
        else activeDiff().colorNotes.push(this.json)
    }
}