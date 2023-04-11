export type Json = Record<string, any>

export type configType = {
    formatFile?: boolean
}

type EaseBase<T extends string> = `easeIn${T}` | `easeOut${T}` | `easeInOut${T}`;

export type ease =
    "easeLinear" |
    "easeStep" |
    EaseBase<"Quad"> |
    EaseBase<"Cubic"> |
    EaseBase<"Quart"> |
    EaseBase<"Quint"> |
    EaseBase<"Sine"> |
    EaseBase<"Expo"> |
    EaseBase<"Circ"> |
    EaseBase<"Elastic"> |
    EaseBase<"Back"> |
    EaseBase<"Bounce">

export type spline = "splineCatmullRom"

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]
export type Vec5 = [number, number, number, number, number]

export type Vec1Keyframes = [number, number, ease?, spline?][]
export type Vec3Keyframes = [number, number, number, number, ease?, spline?][]
export type Vec4Keyframes = [number, number, number, number, number, ease?, spline?][]
export type Vec5Keyframes = [number, number, number, number, number, number, ease?, spline?][]

export type shader =
    "Standard" |
    "OpaqueLight" |
    "TransparentLight" |
    "BaseWater" |
    "BillieWater" |
    "BTSPillar" |
    "InterscopeConcrete" |
    "InterscopeCar" |
    "Obstacle" |
    "WaterfallMirror"

export type reqMods =
    "Cinema" | "Noodle Extensions" | "Chroma" | string

export type suggestMods =
    "Cinema" | "Noodle Extensions" | string
    
export type customDataType = {
    coordinates?: Vec2,
    worldRotation?: Vec3,
    size?: Vec3,
    uninteractable?: boolean,
    localRotation?: Vec3,
    noteJumpMovementSpeed?: number,
    noteJumtStartBeatOffset?: number,
    color?: Vec4,
    spawnEffect?: boolean,
    flip?: Vec2,
    disableNoteGravity?: boolean,
    disableNoteLook?: boolean,
    lightID?: number,
    lightType?: number,
    easing?: ease,
    lockRotation?: boolean,
    speed?: number,
    rotation?: number,
    nameFilter?: number,
    step?: number,
    prop?: number,
    direction?: number,
    track?: string,
    animation?: {
        color?: Vec5Keyframes,
        dissolve?: Vec1Keyframes,
        position?: Vec3Keyframes,
        definitePosition?: Vec3Keyframes,
        size?: Vec3Keyframes,
        scale?: Vec3Keyframes,
        offsetPosition?: Vec3Keyframes,
        localRotation?: Vec3Keyframes,
        dissolveArrow?: Vec1Keyframes
    }
}

export type paths = 
    "ExpertPlusStandard" |
    "ExpertPlusLawless" |
    "ExpertStandard" |
    "ExpertLawless" |
    "HardStandard" |
    "HardLawless" |
    "NormalStandard" |
    "NormalLawless" |
    "EasyStandard" |
    "EasyLawless"