import { file } from '../map.ts'
import{ Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes } from '../types.ts'

export class bombBuilder {
    json: Json = {
        b: 0, x: 0, y: 0, customData: { animation: {} }
    } 
    private config: Json = {}

    /**Create a bombNote object
    * @param { number } time the time of the bomb
    */
    constructor(time: number) { this.json.b = time; return this }

    /**The time of the bomb object */
    time(time: number) { this.json.b = time; return this }

    /**is the bomb fake? */
    fake(fake: boolean) { this.config.fake = fake; return this }
    /**is the bomb interactable? */
    interactable(interactable: boolean) { this.json.customData.uninteractable = !interactable; return this }

    /**the static scale of the bomb */
    scale(scale: Vec3) { this.json.customData.size = scale; return this }
    /**the static X,Y position of the bomb */
    position(position: Vec2) { this.json.customData.coordinates = position; return this }
    /**the static **World Oriented** rotation of the bomb */
    rotation(rotation: Vec3) { this.json.customData.worldRotation = rotation; return this }
    /**the static **Local Oriented** rotation of the bomb */
    localRotation(rotation: Vec3) { this.json.customData.localRotation = rotation; return this }
    /**the lifetime movement speed of the bomb */
    njs(njs: number) { this.json.customData.noteJumpMovementSpeed = njs; return this }
    /**the time offset of the bomb */
    timeOffset(offset: null) { this.json.customData.noteJumpStartBeatOffset = offset; return this }
    /**the track to assign the bomb to */
    track(track: string) { this.json.customData.track = track; return this }
    /**the static color of the bomb */
    color(color: Vec4) { this.json.customData.color = color; return this }
    
    /**flip the note from one position to it's true position */
    flip(flip: Vec2) { this.json.customData.flip = flip; return this }
    /**disable the bomb's 'float up' animation */
    noteGravity(gravity: boolean) { if(gravity==true) { this.json.customData.disableNoteGravity = false } else { this.json.customData.disableNoteGravity = true } return this }
    /**disable the bomb's 'look at player' animation at the end of its jump*/
    noteLook(look: boolean) { if(look == true) { this.json.customData.disableNoteLook = false } else { this.json.customData.disableNoteLook = true } return this }
    /**the bomb'a movemnt speed */

    /**the bombs animated position */
    animatePosition(position: Vec3Keyframes) { this.json.customData.animation.position = position; return this }
    /**the bombs animated definite position */
    animateDefinitePosition(position: Vec3Keyframes) { this.json.customData.animation.definitePosition = position; return this }
    /**the animated dissolve of the bomb */
    animateDissolve(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolve = dissolve; return this }
    /**the animated scale of the bomb */
    animateScale(scale: Vec3Keyframes) { this.json.customData.animation.size = scale; return this }
    /**the animated color of the bomb */
    animateColor(color: Vec4Keyframes) { this.json.customdata.animation.color = color; return this }

    /**returns the bomb in json form */
    toJson() { return this.json as Json }

    /**push the bomb to the output file */
    push() {
        if(this.config.fake === false) file.bombNotes.push(this.json)
        else file.customData.fakeBombNotes.push(this.json)
        return this.json
    }
}
