import { activeDiff } from '../map.ts'
import { Json, Vec3Keyframes, Vec1Keyframes, ease, spline, Vec4Keyframes } from '../types.ts'

/*useles type so users understand how to animate interactable */
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
    /**Create an 'AnimateTrack' custom event
     * @param { string } track the track to animate
     * @param { number } time the time to start animating the track
     * @param { number } duration the duration of the animation
     */
    constructor(track?: string, time?: number, duration?: number) {
        this.json.d.track = track ?? "track"
        this.json.b = time ?? 0
        this.json.d.duration = duration ?? 10
    }

    /**The animated position of the track */
    position(position: Vec3Keyframes) { this.json.d.position = position; return this }
    /**The animated **World Axis Based** rotation of the track */
    rotation(rotation: Vec3Keyframes) { this.json.d.rotation = rotation; return this }
    /**The animated **Local Axis Based** rotation of the track */
    localRotation(rotation: Vec3Keyframes) { this.json.d.localRotation = rotation; return this }
    /**The time **Animation** of the track */
    time(time: Vec1Keyframes) { this.json.d.time = time; return this }
    /**the animated offset position of the track */
    offsetPosition(position: Vec3Keyframes) { this.json.d.offsetPosition = position; return this }
    /**the animated **Offset** world rotation of the track */
    offsetWorldRotation(rotation: Vec3Keyframes) { this.json.d.offsetWorldRotation = rotation; return this }
    /**the animated scale of the track */
    scale(scale: Vec3Keyframes) { this.json.d.scale = scale; return this }
    /**the animated dissolve of the track */
    dissolve(dissolve: Vec1Keyframes) { this.json.d.dissolve = dissolve; return this }
    /**the animated dissolve arrow of the track */
    dissolveArrow(dissolveArrow: Vec1Keyframes) { this.json.d.dissolveArrow = dissolveArrow; return this }
    /**animate interactable from true to false (0 to 1) over time */
    interactable(interactable: [interactableType, number, ease?, spline?][]) { this.json.d.interactable = interactable; return this }
    /**the animated definite position of the track */
    definitePosition(position: Vec3Keyframes) { this.json.d.definitePosition = position; return this }
    /**the animated color of the track */
    color(color: Vec4Keyframes) { this.json.d.color = color; return this }

    /**returns the animate track in json form */
    toJson() { return this.json as Json }

    /**push the animate track to the output file */
    push() {
        activeDiff().customData.customEvents.push(this.json)
    }
}