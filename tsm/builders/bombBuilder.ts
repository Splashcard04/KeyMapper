import { file } from '../map.ts'
import{ Json, Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes } from '../types.ts'

export class bombBuilder {
    json: Json = {
        b: 0, x: 0, y: 0, customData: { animation: {} }
    } 
    private config: Json = {}

    constructor(time: number) { this.json.b = time; return this }

    fake(fake: boolean) { this.config.fake = fake; return this }

    scale(scale: Vec3) { this.json.customData.size = scale; return this }
    position(position: Vec3) { this.json.customData.coordinates = position; return this }
    rotation(rotation: Vec3) { this.json.customData.worldRotation = rotation; return this }
    localRotation(rotation: Vec3) { this.json.customData.localRotation = rotation; return this }
    njs(njs: number) { this.json.customData.noteJumpMovementSpeed = njs; return this }
    offset(offset: null) { this.json.customData.noteJumpStartBeatOffset = offset; return this }
    
    track(track: string) { this.json.customData.track = track; return this }
    color(color: Vec4) { this.json.customData.color = color; return this }
    

    flip(flip: Vec2) { this.json.customData.flip = flip; return this }
    noteGravity(gravity: boolean) { if(gravity==true) { this.json.customData.disableNoteGravity = false } else { this.json.customData.disableNoteGravity = true } return this }
    noteLook(look: boolean) { if(look == true) { this.json.customData.disableNoteLook = false } else { this.json.customData.disableNoteLook = true } return this }

    animatePosition(position: Vec3Keyframes) { this.json.customData.animation.position = position; return this }
    animateDefinitePosition(position: Vec3Keyframes) { this.json.customData.animation.definitePosition = position; return this }
    animateDissolve(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolve = dissolve; return this }
    animateScale(scale: Vec3Keyframes) { this.json.customData.animation.size = scale; return this }
    animateColor(color: Vec4Keyframes) { this.json.customdata.animation.color = color; return this }

    /**returns the bomb in json form */
    toJson() { return this.json as Json }

    push() {
        if(this.config.fake === false) file.bombNotes.push(this.json)
        else file.customData.fakeBombNotes.push(this.json)
        return this.json
    }
}
