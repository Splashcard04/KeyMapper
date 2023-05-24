import { Json, reqMods, suggestMods, Vec3, paths, materialType, configType, defaultArcJson, defaultBombJson, defaultChainJson, defaultMaterialJson, defaultObstacleJson, defaultNoteJson, defaultCustomEventJson, defaultLightEventJson, defaultEnvironmentJson } from './types.ts'
import { log, beatmapFile } from './internal.ts'
import { compress } from "https://deno.land/x/zip@v1.2.3/mod.ts";

export let file = JSON.parse(Deno.readTextFileSync('ExpertPlusLawless.dat'))

type logType = {
    customData?: boolean,
    vannilaData?: boolean
}


type mapConfig = {
    formatJsonFile?: boolean,
    requirements?: reqMods[],
    suggestions?: suggestMods[],
    mirrorQuality?: 1 | 2 | 3
    mapName?: string,
    mapSubName?: string,
    colorLeft?: Vec3,
    colorRight?: Vec3,
    environment?: string
    reduceDebris?: boolean,
    noHud?: boolean,
    hideSpawnEffect?: boolean
}

export class Map {
    configuration: Json = {}
    constructor(input: paths, output: paths) {
        this.configuration.input = input+'.dat'
        this.configuration.output = output+'.dat'
        file = JSON.parse(Deno.readTextFileSync(this.configuration.input))
        this.configuration.file = file
        file.customData = {
            environment: [], customEvents: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {}, pointDefinitions: {}
        }

        const infoFile = JSON.parse(Deno.readTextFileSync("./Info.dat"))
        this.configuration.infoFile = infoFile
    }
    settings: Json = {}


    config(config: mapConfig) {

        this.settings._mirrorGraphicsSettings = config.mirrorQuality

        const format = config.formatJsonFile ?? false
        if(format == true) this.configuration.formatFile = true
        else this.configuration.formatFile = false

        this.configuration.infoFile._difficultyBeatmapSets.forEach((x: Json) => {
            if(this.configuration.output.indexOf(x._beatmapCharacteristicName) !== -1) {
                x._difficultyBeatmaps.forEach((y: Json) => {
                    if(this.configuration.output.indexOf(y._difficulty) !== -1) {
                        y.customData = {}
                        y.customData._requirements = config.requirements ?? []
                        y.customData._suggestions = config.suggestions ?? []
                        if(config.mirrorQuality) y.customData._playerOptions._graphics._mirrorGraphicsSettings = config.mirrorQuality
                        if(config.colorLeft) y.customData._colorLeft = { r: config.colorLeft[0], g: config.colorLeft[1], b: config.colorLeft[2] }
                        if(config.colorRight) y.customData._colorRight = { r: config.colorRight[0], g: config.colorRight[1], b: config.colorRight[2] }
                        if(config.environment) this.configuration.infoFile._environmentName = config.environment
                        if(config.reduceDebris) y.customData._playerOptions._reduceDebris = config.reduceDebris
                        if(config.noHud) y.customData._playerOptions._noTextsAndHuds = config.noHud
                        if(config.hideSpawnEffect) y.customData._playerOptions._hideSpawnEffect = config.hideSpawnEffect
                    }
                })
            }
        })

        if(config.mapName) this.configuration.infoFile._songName = config.mapName
        if(config.mapSubName) this.configuration.infoFile._songSubName = config.mapSubName
    }
    
    end() {

        console.log(`Restarting TSM...`)

        file.version = "3.0.0"

        if(this.configuration.formatFile === true) {
            Deno.writeTextFileSync(this.configuration.output, JSON.stringify(this.configuration.file, null, 4))
        } else {
            Deno.writeTextFileSync(this.configuration.output, JSON.stringify(this.configuration.file, null, 0))
        }
        Deno.writeTextFileSync('Info.dat', JSON.stringify(this.configuration.infoFile, null, 4))

        log(`${this.configuration.output} sucesfully saved!`, 'success')
    }

    export(filenames: paths | Array<paths>) {
        const name = this.configuration.infoFile._songName +`.zip`
        name.replace(/\s/g, "_")
        
        let files: string[] = []

        if(typeof filenames == 'string') {
            files.push(filenames+'.dat')
        } else {
            filenames.forEach(x => {
                files.push(x+'.dat')
            })
        }

        const x = [...Deno.readDirSync('./')]
        x.filter(file => file.endsWith('.ogg')).forEach(x => { files.push(x) })
        x.filter(file => file.endsWith('.png')).forEach(x => { files.push(x) })

        files.push('info.dat')

        compress(files, name, { overwrite: true }).then(() => {
            log(`Files: ${files.join(', ')} succesfully zipped in ${name}`)
        })
    }

    get notes() { return this.configuration.file.colorNotes as Array<defaultNoteJson> }
    get walls() { return this.configuration.file.obstacles as Array<defaultObstacleJson> }
    get bombs() { return this.configuration.file.bombNotes as Array<defaultBombJson> }
    get arcs() { return this.configuration.file.sliders as Array<defaultArcJson> }
    get chains() { return this.configuration.file.burstSliders as Array<defaultChainJson> }
    get lightEvents() { return this.configuration.file.basicBeatmapEvents as Array<defaultLightEventJson> }

    get environment() { return this.configuration.file.customData.environment as Array<defaultEnvironmentJson> }
    get customEvents() { return this.configuration.file.customData.customEvents as Array<defaultCustomEventJson> }
    get fakeNotes() { return this.configuration.file.customData.fakeColorNotes as Array<defaultNoteJson> }
    get fakeWalls() { return this.configuration.file.customData.fakeObstacles as Array<defaultObstacleJson> }
    get fakeBombs() { return this.configuration.file.customData.fakeBombNotes as Array<defaultBombJson> }

    get materials() { return this.configuration.file.customData.materials as defaultMaterialJson }
}


export function activeDiff() {
    return file as beatmapFile //make more accessible throughout the library
}