import { activeDiff } from "../src/main.ts"
import { Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes } from '../src/types.ts'

type noteType = {
    time?: number,
    position?: Vec2,
    type?: 1 | 2,
    cutDirection?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
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

export namespace Note {
    export class Builder {
        json: Record<string, any> = {
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
        private config: Record<string, any> = {}
    
        constructor(time?: number) {
            this.json.b = time ?? 0
        }
    
        /**the note object's time */
        time(time: number) { this.json.b = time; return this }
    
        /**if the note is pushed as fake or not */
        fake(fake?: boolean) {
            if(!fake) this.config.fake = false;
            else this.config.fake = fake
            return this
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
        toJson() { return this.json as Record<string, any> }
    
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

export class Json {
    json: Record<string, any> = {
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
    private config: Record<string,any> = {}
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

    toJson() { return this.json as Record<string, any> }

    push() {
        if(this.config.fake == true) activeDiff().customData.fakeColorNotes.push(this.json)
        else activeDiff().colorNotes.push(this.json)
    }
}
    
}