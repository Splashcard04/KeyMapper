import { activeDiff } from '../map.ts'
import { Json, Vec3Keyframes, Vec1Keyframes, ease, spline, Vec4Keyframes } from '../types.ts'

/**useles type so users understand how to animate interactable */
type interactableType = 1 | 0

export class animateTrackBuilder {
    json: Json = {
        b: 0,
        t: "AnimateTrack",
        d: {
            duration: 1,
            track: "track"
        }
    }
    constructor(track?: string, time?: number duration?: number) {
        this.json.d.track = track ?? "track"
        this.json.b = time ?? 0
        this.json.d.duration = duration ?? 10
    }

    position(position: Vec3Keyframes) { this.json.d.position = position; return this }
    rotation(rotation: Vec3Keyframes) { this.json.d.rotation = rotation; return this }
    localRotation(rotation: Vec3Keyframes) { this.json.d.localRotation = rotation; return this }
    time(time: Vec1Keyframes) { this.json.d.time = time; return this }
    offsetPosition(position: Vec3Keyframes) { this.json.d.offsetPosition = position; return this }
    offsetWorldRotation(rotation: Vec3Keyframes) { this.json.d.offsetWorldRotation = rotation; return this }
    scale(scale: Vec3Keyframes) { this.json.d.scale = scale; return this }
    dissolve(dissolve: Vec1Keyframes) { this.json.d.dissolve = dissolve; return this }
    dissolveArrow(dissolveArrow: Vec1Keyframes) { this.json.d.dissolveArrow = dissolveArrow; return this }
    interactable(interactable: [interactableType, number, ease?, spline?][]) { this.json.d.interactable = interactable; return this }
    definitePosition(position: Vec3Keyframes) { this.json.d.definitePosition = position; return this }
    localPosition(position: Vec3Keyframes) { this.json.d.localPosition = position }
    color(color: Vec4Keyframes) { this.json.d.color = color; return this }

    push() {
        activeDiff().customData.customEvents.push(this.json)
    }
}