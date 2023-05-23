import { activeDiff } from "../map.ts";
import { Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4 } from "../types.ts";

export class arcBuilder {
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
    constructor(time?: number, tailTime?: number) {
        this.json.b = time ?? 0
        this.json.tb = tailTime ?? 1
        return this
    }

    time(time: number) { this.json.b = time; return this }
    x(x: number) { this.json.x = x; return this }
    y(y: number) { this.json.y = y; return this }
    type(type: 1 | 2) { this.json.c = type; return this }
    cutDirection(cutDirection: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) { this.json.d = cutDirection; return this }
    tailTime(time: number) { this.json.tb = time; return this }
    tailX(x: number) { this.json.tx = x; return this }
    tailY(y: number) { this.json.ty = y; return this }
    tailDirection(direction: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) { this.json.tc = direction; return this }

    color(color: Vec4) { this.json.customData.color = color; return this }
    track(track: string) { this.json.customData.track = track; return this }
    njs(njs: number) { this.json.customData.noteJumpMovementSpeed = njs; return this }
    timeOffset(timeOffset: number) { this.json.customData.noteJumpStartBeatOffset = timeOffset; return this }
    rotation(rotation: Vec3) { this.json.customData.worldRotation = rotation; return this }
    localRotation(localRotation: Vec3) { this.json.customData.localRotation = localRotation; return this }
    scale(scale: Vec3) { this.json.customData.size = scale; return this }
    interactable(interactable: boolean) { this.json.customData.uninteractable = !interactable; return this }
    position(pos: Vec2) { this.json.customData.coordinates = pos; return this }


    animatePosition(position: Vec3Keyframes) { this.json.customData.animation.position = position; return this }
    animateDefinitePosition(position: Vec3Keyframes) { this.json.customData.animation.adefinitePosition = position; return this }
    animateDissolve(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolve = dissolve; return this }
    animateDissolveArrow(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolveArrow = dissolve; return this }
    animateScale(scale: Vec3Keyframes) { this.json.customData.animation.scale = scale; return this }
    animateColor(color: Vec4) { this.json.customData.animation.color = color; return this }
    animateRotation(rotation: Vec3Keyframes) { this.json.customData.animation.worldRotation = rotation; return this }
    animateLocalRotation(localRotation: Vec3Keyframes) { this.json.customData.animation.localRotation = localRotation; return this }


    toJson() { return this.json as Json }

    push() {
        activeDiff().sliders.push(this.json)
        return this
    }
}