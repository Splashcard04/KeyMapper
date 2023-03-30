export type Json = Record<string, any>

export type configType = {
    formatFile?: boolean
}

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
export type Vec4 = [number, number, number, number]

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
    "Cinema" | "Noodle Extensions" | "Chroma"

export type suggestMods =
    "Cinema" | "Noodle Extensions"