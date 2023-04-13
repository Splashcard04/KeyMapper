import { Json, Vec3 } from "../types.ts"

type cinemaScreenType = {
    id?: string,
    lookup?: "URL" | "youtubeID",
    title?: string,
    author?: string,
    videoFile?: string,
    duration?: string,
    offset?: number,
    configByMapper?: boolean,
    environmentName?: string,
    playbackSpeed?: number,
    loop?: boolean,
    videoEndTime?: number,
    position?: Vec3,
    rotation?: Vec3,
    height?: number,
    curvature?: number,
    subsurfaces?: number,
    customPlatform?: boolean,
    forceEnvironmentModification?: boolean,
    mergePropGroups?: boolean,
    transparency?: boolean,
    bloom?: boolean,
    brightness?: number,
    contrast?: number,
    saturation?: number,
    exposure?: number,
    gamma?: number,
    hue?: number,
    vignetteType?: "elliptical" | "rectangular",
    vignetteRadius?: number,
    vignetteSoftness?: number,
    extraScreens?: { position: Vec3, rotation: Vec3 }[]
}

export class cinemaScreen {
    json: Json = {}
    config: Json = {
        file: JSON.parse(Deno.readTextFileSync("cinema-video.json"))
    }

    constructor(x: cinemaScreenType) {
        if(x.lookup === 'youtubeID') this.json.videoID = x.id ?? ""
        else this.json.videoUrl = x.id ?? ""

        this.json.title = x.title ?? ""
        this.json.author = x.author ?? ""
        this.json.videoFile = x.videoFile ?? ""
        this.json.duration = x.duration
        this.json.offset = x.offset
        this.json.configByMapper = x.configByMapper
        this.json.environmentName = x.environmentName
        this.json.playbackSpeed = x.playbackSpeed
        this.json.loop = x.loop
        this.json.endVideoAt = x.videoEndTime
        this.json.position = x.position
        this.json.rotation = x.rotation
        this.json.screenHeight = x.height
        this.json.screenCurvature = x.curvature
        this.json.screenSubsurfaces = x.subsurfaces
        this.json.disableDefaultModifications = x.customPlatform
        this.json.forceEnvironmentModifications = x.forceEnvironmentModification
        this.json.mergePropGroups = x.mergePropGroups
        this.json.transparency = x.transparency
        this.json.bloom = x.bloom
        this.json.colorCorrection.brightness = x.brightness
        this.json.colorCorrection.contrast = x.contrast
        this.json.colorCorrection.saturation = x.saturation
        this.json.colorCorrection.exposure = x.exposure
        this.json.colorCorrection.gamma = x.gamma
        this.json.colorCorrection.hue = x.hue
        this.json.vignette.type = x.vignetteType
        this.json.vignette.radius = x.vignetteRadius
        this.json.vignette.softness = x.vignetteSoftness
        if(x.extraScreens) {
            x.extraScreens.forEach(x => {
                this.json.extraScreens.push({
                    position: {
                        x: x.position[0],
                        y: x.position[1],
                        z: x.position[2]
                    },
                    rotation: {
                        x: x.rotation[0],
                        y: x.rotation[1],
                        z: x.rotation[2]
                    }
                })
            })
        }
    }

    push() {
        Deno.writeTextFileSync("cinema-video.json", JSON.stringify(this.config.file, null, 4))
    }
}
