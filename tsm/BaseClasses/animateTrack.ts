import { activeDiff } from '../map.ts'
import { Json, ease, Vec1Keyframes, Vec3Keyframes, Vec4Keyframes } from '../types.ts'

type animTrackType = {
    time?: number,
    duration?: number,
    easing?: ease,
    position?: Vec3Keyframes,
    localPosition?: Vec3Keyframes,
    rotation?: Vec3Keyframes,
    localRotation?: Vec3Keyframes,
    scale?: Vec3Keyframes,
    color?: Vec4Keyframes,
    dissolve?: Vec1Keyframes,
    dissolveArrow?: Vec1Keyframes,
    interactable?: Vec1Keyframes,
    timeAnim?: Vec1Keyframes

export class animateTrack {
    json: Json = {
        b: 0,
        t: "AnimateTrack",
        d: {
            duration: 10
        }
    }
    constructor(x: animTrackType) {
        this.json.b = x.time ?? 0
        this.json.d.duration = x.duration ?? 10
        this.json.d.easing = x.easing
        this.json.d.position = x.position
        this.json.d.localPosition = x.localPosition
        this.json.d.rotation = x.rotation
        this.json.d.localRotation = x.localRotation
        this.json.d.scale = x.scale
        this.json.d.color = x.color
        this.json.d.dissolve = x.dissolve
        this.json.d.dissolveArrow = x.dissolveArrow
        this.json.d.interactable = x.interactable
        this.json.d.time = x.timeAnim
    }

    push() {
        activeDiff().customData.customEvents.push(this.json)
    }
}