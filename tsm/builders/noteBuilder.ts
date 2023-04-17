import { activeDiff } from "../main.ts"
import { Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes, Json } from '../types.ts'

export class noteBuilder {
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

    constructor(time?: number) {
        this.json.b = time ?? 0
    }

    /**if the note is pushed as fake or not */
    fake(fake?: boolean) {
        if(!fake) this.config.fake = false;
        else this.config.fake = fake
    }

    interactable(interactable: boolean) {
        if(interactable == false) {
            this.json.customData.uninteractable = true
        } else {
            this.json.customData.uninteractable = false
        }
    }

    /**the x,y position of the note */
    position(position: Vec2) {
        this.json.customData.coordinates = position; return this
    }
    /**the type of the note (red or blue) */
    type(type: 1 | 2) {
        this.json.c = type
    }
    /**the cut direction of the note */
    cutDirection(direction: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) {
        this.json.d = direction; return this
    }
    /**the note's cut direction angle offset */
    angleOffset(offset: number) { 
        this.json.a = offset; return this
    }

    /**the static color of the note */
    color(color: Vec4) { this.json.customData.color = color; return this }
    /**the static scale of the note */
    scale(scale: Vec3) { this.json.customData.size = scale; return this }
    /**the static locally oriented rotation of the note */
    localRotation(rotation: Vec3) { this.json.customData.localRotation = rotation; return this }
    /**the world axis oriented rotation of the note */
    rotation(rotation: Vec3) { this.json.customData.worldRotation = rotation; return this }
    /**the track for the note to be assigned to */
    track(track: string) { this.json.customData.track = track; return this }


    /**the animated dissolve of the note's body */
    animateDissolve(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolve = dissolve; return this }
    /**the animated dissolve of the note's arrow */
    animateDissolveArrow(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolveArrow = dissolve; return this }
    /**the animated position of the note (still follows a note lifespan path) */
    animatePosition(position: Vec3Keyframes) { this.json.customData.animation.position = position; return this }
    /**the animated definite position of the note (does not follow a note lifespan path) */
    animateDefinitePosition(definitePosition: Vec3Keyframes) { this.json.customData.animation.definitePosition = definitePosition; return this }
    /**the animated scale (size) of the note */
    animateScale(scale: Vec3Keyframes) { this.json.customData.animation.scale = scale; return this }
    /**the animated rotation of the note on a local axis */
    animateLocalRotation(rotation: Vec3Keyframes) { this.json.customData.animation.localRotation = rotation; return this }
    /**the animated rotation of the note with the world as an axis */
    animateRotation(rotation: Vec3Keyframes) { this.json.customData.animation.offsetWorldRotation = rotation; return this }
    /**the animated color of the note */
    animateColor(color: Vec4Keyframes) { this.json.customData.animation.color = color; return this }
    /**the animated offset position of the note */
    animateOffsetPosition(position: Vec3Keyframes) { this.json.customData.animation.offsetPosition = position; return this }
    /**the speed that the note will move at across it's lifespan */
    njs(speed: number) { this.json.customData.noteJumpMovementSpeed = speed; return this }
    /**the beat offset of the note */
    timeOffset(offset: number) { this.json.customData.noteJumpStartBeatOffset = offset; return this }
    /**flip the note from a set spawn position to its true position */
    flip(flip: Vec2) { this.json.customData.flip = flip; return this }
    /**disable the notes "float up" animation at it's spawn */
    disableFloatUp() { this.json.customData.disableNoteGravity = true; return this }
    /**disable the note's turn animation at the end of its life */
    disableNoteLook() { this.json.customData.disableNoteLook = true; return this }

    /**returns the note object as json */
    toJson() { return this.json as Json }

    /**push the note to the difficulty */
    push() {
        if(this.config.fake == false) {
            activeDiff().colorNotes.push(this.json)
        } else {
            activeDiff().customData.fakeColorNotes.push(this.json)
        }

        return this
    }
}