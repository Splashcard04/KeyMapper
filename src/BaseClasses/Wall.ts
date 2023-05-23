import { activeDiff } from '../map.ts'
import { Json, Vec2, Vec3Keyframes, Vec4, Vec4Keyframes } from '../types.ts'

type wallType = {
    time?: number,
    duration?: number,
    scale?: number,
    position?: Vec2,
    color?: Vec4,
    rotation?: Vec3Keyframes,
    localRotation?: Vec3Keyframes,
    track?: string,
    fake?: boolean,
    interactable?: boolean,
    animateColor?: Vec4Keyframes,
    animateDissolve?: Vec3Keyframes,
    animateRotation?: Vec3Keyframes,
    animateLocalRotation?: Vec3Keyframes,
    animatePosition?: Vec3Keyframes,
    animateDefinitePosition?: Vec3Keyframes,
    animateScale?: Vec3Keyframes,
}

export class Wall {
    json: Json = {
        b: 0,
        d: 1,
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        customData: {}
    }
    private config: Json = {}

    constructor(x: wallType) {
        this.config.fake = x.fake ?? false
        this.json.customData.uninteractable = !x.interactable

        this.json.b = x.time ?? 0
        this.json.d = x.duration ?? 1
        this.json.customData.size = x.scale
        this.json.customData.coordinates = x.position
        this.json.customData.worldRotation = x.rotation
        this.json.customData.localRotation = x.localRotation
        this.json.customData.track = x.track

        this.json.customData.color = x.color
        this.json.customData.animation.dissolve = x.animateDissolve
        this.json.customData.animation.worldRotation = x.animateRotation
        this.json.customData.animation.localRotation = x.animateLocalRotation
        this.json.customData.animation.position = x.animatePosition
        this.json.customData.animation.definitePosition = x.animateDefinitePosition
        this.json.customData.animation.size = x.animateScale
        return this
    }

    toJson() { return this.json as Json }

    push() {
        if(this.config.fake == true) {
            activeDiff().customData.fakeObstacles.push(this.json)
        } else {
            activeDiff().obstacles.push(this.json)
        }
    }
}