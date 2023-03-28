export type json = Record<string, any>

export type configType = {
    formatFile?: boolean
}

type EaseBase<T extends string> = `easeIn${T}` | `easeOut${T}` | `easeInOut${T}`;

type Ease =
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

type Spline = "splineCatmullRom"


type Vec3Anim = [number, number, number, number, Ease?, Spline?][]
type Vec1Anim = [number, number, Ease?, Spline?][]
type vec5Anim = [number, number, number, number, number, Ease?, Spline?][]

export type lookupMethod = "Contains" | "Regex" | "EndsWith" | "StartsWith" | "Exact"

export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]

export type cinemaLookup = "youtubeID" | "URL"

export type environmentName = 
    "DefaultEnvironment" | "GagaEnvironment" | "BillieEnvironment"


export type customDataType = {
    coordinates?: [],
    worldRotation?: [],
    size?: [],
    uninteractable?: [],
    localRotation?: [],
    noteJumpMovementSpeed?: number,
    noteJumtStartBeatOffset?: number,
    color?: [],
    spawnEffect?: boolean,
    flip?: boolean,
    disableNoteGravity?: boolean,
    disableNoteLook?: boolean,
    lightID?: number,
    lightType?: number,
    easing?: string,
    lockRotation?: boolean,
    speed?: number,
    rotation?: number,
    nameFilter?: number,
    step?: number,
    prop?: number,
    direction?: number,
    track?: string,
    animation?: {
        color?: vec5Anim,
        dissolve?: Vec1Anim,
        position?: Vec3Anim,
        definitePosition?: Vec3Anim,
        size?: Vec3Anim,
        scale?: Vec3Anim,
        offsetPosition?: Vec3Anim,
        localRotation?: Vec3Anim,
        dissolveArrow?: Vec1Anim
    }
}