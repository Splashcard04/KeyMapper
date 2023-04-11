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

export type Vec1Keyframes = [number, number, ease?, spline?][]
export type Vec3Keyframes = [number, number, number, number, ease?, spline?][]
export type Vec4Keyframes = [number, number, number, number, number, ease?, spline?][]

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
