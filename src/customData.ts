import { threadId } from 'worker_threads'
import { Vec3, Vec4, Vec2, Vec5, Vec1Anim, Vec3Anim, vec5Anim, Ease, customDataType } from './types'

export class customDataBuilder {
    data: customDataType = {}

    coordinates(chords: [number, number]) { this.data.coordinates = chords }
    rotation(rot: Vec3) { this.data.worldRotation = rot }
    scale(scale: Vec3) { this.data.size = scale }

    interactable(interactable: boolean) {
        if(interactable==true) this.data.uninteractable = false
        else this.data.uninteractable = true
    }

    localRotation(rot: Vec3) { this.data.localRotation = rot }
    njs(njs: number) { this.data.noteJumpMovementSpeed = njs }
    timeOffset(offset: number) { this.data.noteJumtStartBeatOffset = offset }
    color(color: Vec4) { this.data.color = color }
    spawnEffect(spawnEffect: boolean) { this.data.spawnEffect = spawnEffect }
    flip(flip: Vec2) { this.data.flip = flip }
    disableNoteGravity(disable: boolean) { this.data.disableNoteGravity = disable }
    disableNoteLook(disable: boolean) { this.data.disableNoteLook = disable }
    lightID(lightID: number) { this.data.lightID = lightID }
    lightType(lightType: number) { this.data.lightType = lightType }
    easing(easing: Ease) { this.data.easing = easing } 
    lockRotation(lockRotation: boolean) { this.data.lockRotation = lockRotation }
    speed(speed: number) { this.data.speed = speed }
    nameFilter(nameFilter: number) { this.data.nameFilter = nameFilter }
    step(step: number) { this.data.step = step }
    prop(prop: number) { this.data.prop = prop }
    direction(direction: number) { this.data.direction = direction }
    track(track: string) { this.data.track = track }
    animateColor(color: vec5Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.color = color }
    animateDissolve(dissolve: Vec1Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.dissolve = dissolve }
    animatePosition(position: Vec3Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.position = position }
    animateDefinitePosition(position: Vec3Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.definitePosition = position }
    animateScale(scale: Vec3Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.scale = scale }
    animateOffsetPosition(offset: Vec3Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.offsetPosition = offset }
    animateLocalRotation(rotation: Vec3Anim) { if(!this.data.animation) this.data.animation = {}; this.data.animation.localRotation = rotation }
    animateDissolveArrow(dissolve: Vec1Anim) { if(!this.data.animation) this.data.animation = {} ; this.data.animation.dissolve = dissolve }

    end() {
        return this.data as customDataType
    }
}

export class customData {
    constructor(data: customDataType) {
        return data as customDataType
    }
}
