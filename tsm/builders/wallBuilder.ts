import { activeDiff } from "../map.ts"
import { Vec1Keyframes, Vec2, Vec3, Vec3Keyframes, Vec4, Vec4Keyframes, Json } from "../types.ts"

export class WallBuilder {
    json: Json = {
        b: 0,
        x: 0,
        y: 0,
        w: 1,
        h: 0,
        customData: {
            animation: {}
        }
    }
    private config: Json = {}

    constructor(time: number) {
        this.json.b = time;
        return this
    }
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
    }

}