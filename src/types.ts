export type json = Record<string, any>

export type configType = {
    formatFile?: boolean
}

type EaseBase<T extends string> = `easeIn${T}` | `easeOut${T}` | `easeInOut${T}`;

export type Ease =
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

export type Spline = "splineCatmullRom"


export type Vec3Anim = [number, number, number, number, Ease?, Spline?][]
export type Vec1Anim = [number, number, Ease?, Spline?][]
export type vec5Anim = [number, number, number, number, number, Ease?, Spline?][]

export type lookupMethod = "Contains" | "Regex" | "EndsWith" | "StartsWith" | "Exact"

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]
export type Vec5 = [number, number, number, number, number]

export type cinemaLookup = "youtubeID" | "URL"

export type environmentName = 
    "DefaultEnvironment" | "GagaEnvironment" | "BillieEnvironment"



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
        easing?: Ease,
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
