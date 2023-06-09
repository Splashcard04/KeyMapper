import { Json, Vec3 } from '../types.ts'

type cinemaLookup = "URL" | "youtubeID"

export class additionalScreenBuilder {
    json: Json = {
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        }
    }
    
    position(position: Vec3) {
        this.json.position = {
            'x': position[0],
            'y': position[1],
            'z': position[2]
        }
        return this
    }

    rotation(rotation: Vec3) {
        this.json.rotation = {
            'x': rotation[0],
            'y': rotation[1],
            'z': rotation[2]
        }
        return this
    }

    push() {
        return this.json as { position: Vec3, rotation: Vec3 }
    }

}

export class cinemaScreenBuilder {
    json: Json = {}

    constructor(id?: string, lookup?: cinemaLookup) {
        if(lookup === 'youtubeID') this.json.videoID = id
        else this.json.videoUrl = id
        return this
    }


    title(title: string) { this.json.title = title; return this }
    author(author: string) { this.json.author = author; return this }
    videoFile(path: string) { 
        if(path.indexOf('.mp4') !== -1) path += '.mp4'
        
        this.json.videoFile = path
        return this
    }
    duration(duration: string) { this.json.duration = duration; this }
    offset(offset: number) { this.json.offset = offset; return this }
    configByMapper(byMapper: boolean) { this.json.configByMapper = byMapper; return this }
    environmentName(environment: string) { this.json.enviornmentName = environment; return this }
    playbackSpeed(speed: number) { this.json.playbackSpeed = speed; return this }
    loop(loop: boolean) { this.json.loop = loop; return this }
    videoEndTime(time: number) { this.json.endVideoAt = time; return this }
    position(position: Vec3) {
        this.json.position = {
            'x': position[0],
            'y': position[1],
            'z': position[2]
        }
        return this
    }
    rotation(rotation: Vec3) {
        this.json.rotation = {
            'x': rotation[0],
            'y': rotation[1],
            'z': rotation[2]
        }
        return this
    }
    height(height: number) { this.json.screenHeight = height; return this }
    curvature(curvature: number) { this.json.screenCurvature = curvature; return this }
    subsurfaces(subsurfaces: number) { this.json.screenSubsurfaces = subsurfaces; return this }
    customPlatform(customPlatform: boolean) { this.json.disableDefaultModifications = customPlatform }
    forceEnvironmentModification(force: boolean) { this.json.forceEnvironmentModifications = force; return this }
    mergePropGroups(merge: boolean) { this.json.mergePropGroups = merge; return this }
    transparency(transparency: boolean) { this.json.transparency = transparency; return this }
    bloom(bloom: boolean) { this.json.bloom = bloom; return this } 

    brightness(brightness: number) { this.json.colorCorrection.brightness = brightness; return this }
    contrast(contrast: number) { this.json.colorCorrection.contrast = contrast; return this }
    saturation(saturation: number) { this.json.colorCorrection.saturation = saturation; return this }
    exposure(exposure: number) { this.json.colorCorrection.export = exposure; return this }
    gamma(gamma: number) { this.json.colorCorrection.gamma = gamma; return this }
    hue(hue: number) { this.json.colorCorrection.hue = hue; return this }

    vignetteType(type: "elliptical" | "rectangular") { this.json.vignette.type = type; return this }
    vignetteRadius(radius: number) { this.json.vignette.radius = radius; return this }
    vignetteSoftness(softness: number) { this.json.vignette.softness = softness; return this }

    addScreens(...settings: { position: Vec3, rotation: Vec3 }[] | extraScreenBuilder[]) {
        settings.forEach(x => {
            this.json.additionalScreens.push({
                position: { x: x.position[0], y: x.position[1], z: x.position[2] },
                rotation: { x: x.rotation[0], y: x.position[1], z: x.position[2] }
            })
        })

        return this
    }

    setScreens(...screens: { position: Vec3, rotation: Vec3 }[] ) {
        const screen: Array<Json> = []
        screens.forEach(x => {
            screen.push({
                    'position': {
                        'x': x.position[0],
                        'y': x.position[1],
                        'z': x.position[2]
                    },
                    'rotation': {
                        'x': x.rotation[0],
                        'y': x.rotation[1],
                        'z': x.rotation[2]
                    }
            })
        })
        this.json.additionalScreens = screens
        return this
    }

    /**returns the cinema screen in json form */
    toJson() { return this.json as Json }

    push() {
        Deno.writeTextFileSync('cinema-video.json', JSON.stringify(this.json, null, 4))
        return this
    }
}