import { activeDiff } from "../src/map.ts"
import { Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes, Json } from "../src/types.ts"


export namespace Wall {
    export class Builder {
        json: Json = {
            b: 0,
            d: 10,
            x: 0,
            y: 0,
            w: 1,
            h: 0,
            customData: {
                animation: {}
            }
        }
        private config: Json = {}
    
        constructor(time: number, duration: number) {
            this.json.b = time ?? 0;
            this.json.d = duration ?? 10
            return this
        }
        /**the wall object's start time */
        time(time: number) { this.json.b = time; return this }
        /**the wall object's duration */
        duration(duration: number) { this.json.d = duration; return this }
        /**is the wall fake? */
        fake(fake: boolean) { this.config.fake = fake; return this }
        /**the wall's x and why coordinates position */
        position(position: Vec2) { this.json.customData.coordinates = position; return this }
        /**the static scale of the wall */
        scale(scale: Vec3) { this.json.customData.size = scale; return this }
        /**the wall's static rotation on a local axis */
        localRotation(rotation: Vec3) { this.json.customData.localRotation = rotation; return this }
        /**the wall's static rotation on the world axis */
        rotation(rotation: Vec3) { this.json.customData.worldRotation = rotation; return this }
        /**the wall's static color */
        color(color: Vec4) { this.json.customData.color = color; return this }
        /**the wall's movment speed */
        movmentSpeed(speed: number) { this.json.customData.noteJumpMovementSpeed = speed; return this }
        /**the track to assign the wall to */
        track(track: string) { this.json.customData.track = track; return this }
        
        //#region animation
    
        /**the wall's animated rotation on a local axis */
        animateLocalRotation(rotation: Vec3Keyframes) { this.json.customData.animation.localRotation = rotation; return this }
        /**the wall's animated rotation on the world axis */
        animateRotation(rotation: Vec3Keyframes) { this.json.customData.animation.worldRotation = rotation; return this }
        /**the wall's scale animation */
        animateScale(scale: Vec3Keyframes) { this.json.customData.animation.size = scale; return this }
        /**the wall's color animation */
        animateColor(color: Vec4Keyframes) { this.json.customData.animation.color = color; return this }
        /**the wall's dissolve animation */
        animateDissolve(dissolve: Vec1Keyframes) { this.json.customData.animation.dissolve = dissolve; return this }
        /**the wall's position animation */
        animatePosition(position: Vec3Keyframes) { this.json.customData.animation.position = position; return this }
        /**the wall's definite position animation */
        animateDefinitePosition(position: Vec3Keyframes) { this.json.customData.animation.definitePosition = position; return this }
    
        //#endregion
    
        /**returns the wall object as json */
        toJson() { return this.json as Json }
    
        push() {
            if(this.config.fake === true) {
                activeDiff().customData.fakeObstacles.push(this.json)
            } else {
                activeDiff().obstacles.push(this.json)
            }
            return this
        }
    }

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
    
    export class Json {
        json: Record<string, any> = {
            b: 0,
            d: 1,
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            customData: {}
        }
        private config: Record<string, any> = {}
    
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
}
