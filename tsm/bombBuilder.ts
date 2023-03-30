import { file } from './map.ts'
import{ Json, Vec2, Vec3, Vec4 } from './types.ts'

export class bombBuilder {
    json: Json = {
        b: 0, x: 0, y: 0, customData: { animation: {} }
    } 
    config: Json = {}

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
    noteLook(look: boolean) { if(look == true) { this.json.customData.disableNoteLook = true } else { this.json.customData.disableNoteLook = false } return this }

    

    push() {
        if(this.config.fake === false) file.bombNotes.push(this.json)
        else file.customData.fakeBombNotes.push(this.json)
        return this.json
    }
}