export type json = Record<string, any>

export type configType = {
    formatFile?: boolean
}

export type lookupMethod = "Contains" | "Regex" | "EndsWith" | "StartsWith" | "Exact"

export type Vec3 = [number, number, number]

export type cinemaLookup = "youtubeID" | "URL"

export type environmentName = 
    "DefaultEnvironment" | "GagaEnvironment" | "BillieEnvironment"