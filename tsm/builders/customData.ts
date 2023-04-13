import { Vec3, Vec4, Vec2, Vec1Keyframes, Vec3Keyframes, Vec4Keyframes, ease, customDataType, Json } from '../types.ts'

export class customDataBuilder {
    data: Json = {}

    coordinates(chords: [number, number]) { this.data.coordinates = chords }
    rotation(rot: Vec3) { this.data.worldRotation = rot }
    scale(scale: Vec3) { this.data.size = scale }

    interactable(interactable: boolean) {
        if(interactable==true) this.data.uninteractable = false
        else this.data.uninteractable = true
        return this
    }

    localRotation(rot: Vec3) { this.data.localRotation = rot; return this }
    njs(njs: number) { this.data.noteJumpMovementSpeed = njs; return this }
    timeOffset(offset: number) { this.data.noteJumtStartBeatOffset = offset; return this }
    color(color: Vec4) { this.data.color = color; return this }
    spawnEffect(spawnEffect: boolean) { this.data.spawnEffect = spawnEffect; return this }
    flip(flip: Vec2) { this.data.flip = flip; return this }
    disableNoteGravity(disable: boolean) { this.data.disableNoteGravity = disable; return this }
    disableNoteLook(disable: boolean) { this.data.disableNoteLook = disable; return this }
    lightID(lightID: number) { this.data.lightID = lightID; return this }
    lightType(lightType: number) { this.data.lightType = lightType; return this }
    easing(easing: ease) { this.data.easing = easing; return this } 
    lockRotation(lockRotation: boolean) { this.data.lockRotation = lockRotation; return this }
    speed(speed: number) { this.data.speed = speed; return this }
    nameFilter(nameFilter: number) { this.data.nameFilter = nameFilter; return this }
    step(step: number) { this.data.step = step; return this }
    prop(prop: number) { this.data.prop = prop; return this }
    direction(direction: number) { this.data.direction = direction; return this }
    track(track: string) { this.data.track = track; return this }
    animateColor(color: Vec4Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.color = color; return this }
    animateDissolve(dissolve: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.dissolve = dissolve; return this }
    animatePosition(position: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.position = position; return this }
    animateDefinitePosition(position: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.definitePosition = position; return this }
    animateScale(scale: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.scale = scale; return this }
    animateOffsetPosition(offset: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.offsetPosition = offset; return this }
    animateLocalRotation(rotation: Vec3Keyframes) { if(!this.data.animation) this.data.animation = {}; this.data.animation.localRotation = rotation; return this }
    animateDissolveArrow(dissolve: Vec1Keyframes) { if(!this.data.animation) this.data.animation = {} ; this.data.animation.dissolve = dissolve; return this }

    end() {
        return this.data as customDataType
    }
}
