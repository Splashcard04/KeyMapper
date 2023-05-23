import { Vec3, Vec4, Vec2, Vec1Keyframes, Vec3Keyframes, Vec4Keyframes, ease, customDataType, Json } from '../types.ts'

export class customDataBuilder {
    data: Json = {}

    /**the X,Y position */
    coordinates(chords: [number, number]) { this.data.coordinates = chords; return this }
    /**world axis oriented rotation */
    rotation(rot: Vec3) { this.data.worldRotation = rot; return this }
    /**static scale */
    scale(scale: Vec3) { this.data.size = scale; return this }
    /**can the object be hit with a saber? */
    interactable(interactable: boolean) {
        if(interactable==true) this.data.uninteractable = false
        else this.data.uninteractable = true
        return this
    }
    /**local axis oriented rotation */
    localRotation(rot: Vec3) { this.data.localRotation = rot; return this }
    /**note lifetime movement speed */
    njs(njs: number) { this.data.noteJumpMovementSpeed = njs; return this }
    /**object time offset */
    timeOffset(offset: number) { this.data.noteJumtStartBeatOffset = offset; return this }
    /**object color */
    color(color: Vec4) { this.data.color = color; return this }
    /**enable the object's spawn effect */
    spawnEffect(spawnEffect: boolean) { this.data.spawnEffect = spawnEffect; return this }
    /**filp an object from any position to it's true position */
    flip(flip: Vec2) { this.data.flip = flip; return this }
    /**disable the note's 'float up' animation at the beginning of it's jump*/
    disableNoteGravity(disable?: boolean) { this.data.disableNoteGravity = disable ?? true; return this }
    /**disable the note's 'look at player' animation at the end of it's jump*/
    disableNoteLook(disable?: boolean) { this.data.disableNoteLook = disable?? true ; return this }
    /**lightID for lighting a laser */
    lightID(lightID: number) { this.data.lightID = lightID; return this }
    /**lightType for lighting a laser */
    lightType(lightType: number) { this.data.lightType = lightType; return this }
    /**easing for a track */
    easing(easing: ease) { this.data.easing = easing; return this } 
    /**Lock an objects rotation */
    lockRotation(lockRotation: boolean) { this.data.lockRotation = lockRotation; return this }
    /**sped */
    speed(speed: number) { this.data.speed = speed; return this }
    /**filter a track name */
    nameFilter(nameFilter: number) { this.data.nameFilter = nameFilter; return this }
    /**step property for a ring event*/
    step(step: number) { this.data.step = step; return this }
    /**prop property for a ring event */
    prop(prop: number) { this.data.prop = prop; return this }
    direction(direction: number) { this.data.direction = direction; return this }
    /**assign an object to a track */
    track(track: string) { this.data.track = track; return this }
    /**animate the color of an objct */
    animateColor(color: Vec4Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.color = color; return this }
    /**animate the dissolve of a note/wall/bomb */
    animateDissolve(dissolve: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.dissolve = dissolve; return this }
    /**animate the position of an object */
    animatePosition(position: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.position = position; return this }
    /**animate the definite position of an object */
    animateDefinitePosition(position: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.definitePosition = position; return this }
   /**animate the scale of an object */
    animateScale(scale: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.scale = scale; return this }
    /**animate the offset position of an object */
    animateOffsetPosition(offset: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.offsetPosition = offset; return this }
    /**animate the local axis rotation of an object */
    animateLocalRotation(rotation: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.localRotation = rotation; return this }
    /**animate the dissolve arrow of a note */
    animateDissolveArrow(dissolve: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {} ; this.data.animation.dissolve = dissolve; return this }

    /**end, build and return the custom data as json */
    end() {
        return this.data as customDataType
    }
}
