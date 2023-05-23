import { cutDirection } from './constants.ts'

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
    "Cinema" | "Noodle Extensions" | "Chroma" | string
    
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
    offsetWorldRotation?: number,
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
        offsetPosition?: Vec3Keyframes,
        localRotation?: Vec3Keyframes,
        dissolveArrow?: Vec1Keyframes,
        offsetWorldRotation?: Vec3Keyframes
    }
}



export type lightTypeType =
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

type base<T extends string> = `Easy${T}` | `Normal${T}` | `Hard${T}` | `Expert${T}` | `ExpertPlus${T}`

export type paths = base<"Standard"> | base<"Lawless"> |  base<"NoArrows"> | base<"OneSaber"> | base<"360Degree"> | base<"90Degree">

export type lookup = "Contains" | "Regex" | "Exact" | "StartsWith" | "EndsWith"

export type shape = "Cube" | "Triangle" | "Quad" | "Cyliner" | "Capsule" | "Sphere"

export type materialType = {
    shader: shader,
    color?: Vec4,
    shaderKeywords?: [],
    track?: ""
} | string

//Map get() method types
export type defaultNoteJson = {
    b: number,
    x: 0 | 1 | 2 | 3,
    y: 0 | 1 | 2,
    c: 1 | 0,
    d: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | cutDirection,
    a: number,
    customData?: customDataType | Json
}

export type defaultObstacleJson = {
    b: number,
    d: number,
    x: 0 | 1 | 2 | 3,
    y: 0 | 1 | 2,
    w: 0 | 1 | 2 | 3,
    h: 0 | 1 | 2,
    customData?: customDataType | Json
}

export type defaultBombJson = {
    b: number,
    x: 0 | 1 | 2 | 3,
    y: 0 | 1 | 2,
    customData: customDataType | Json
}

export type defaultArcJson = {
    b: number,
    c: number,
    x: number,
    y: number,
    d: number,
    mu: number,
    tb: number,
    tx: number,
    ty: number,
    tc: number,
    tmu: number,
    m: number,
    customData: customDataType | Json
}

export type defaultChainJson = {
    b: number,
    x: number,
    y: number,
    c: number,
    d: number,
    tb: number,
    tx: number,
    ty: number,
    sc: number,
    s: number,
    customData: customDataType | Json
}

export type defaultMaterialJson = Record<any, materialType>