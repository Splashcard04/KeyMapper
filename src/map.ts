import { Json, reqMods, envNames, suggestMods, Vec3, paths, materialType, configType, defaultArcJson, defaultBombJson, defaultChainJson, defaultObstacleJson, defaultNoteJson, defaultCustomEventJson, defaultLightEventJson, defaultEnvironmentJson, defaultGeometryJson } from './types.ts'
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
    environment?: envNames,
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
                        y.customData = {
                            _requirements: [],
                            _suggestions: [],
                            _playerOptions: {
                                _graphics: {}
                            }
                        }
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
    
    log(vannilaData?: boolean, customData?: true) {
        const files = this.configuration.file

        console.log(
            `\x1b[35m============[${this.configuration.infoFile._songName}]============`
        )
        if(vannilaData == true) {
            console.log(`
            \x1b[1;34mVanilla Data:
                \x1b[0m
                    \x1b[36mNotes: ${files.colorNotes.length},

                    \x1b[36mWalls: ${files.obstacles.length},

                    \x1b[36mBombs: ${files.bombNotes.length},

                    \x1b[36mChains: ${files.burstSliders.length}

                    \x1b[36mArcs: ${files.sliders.length}
                    
                    \x1b[0m
            `)
        }

        if(customData && customData == true) {
            console.log(`
            \x1b[1;34mCustom Data:
                \x1b[0m
                \x1b[36mFake Notes: ${files.customData.fakeColorNotes.length},

                \x1b[36mFake Walls: ${files.customData.fakeObstacles.length},

                \x1b[36mFake Bombs: ${files.customData.fakeBombNotes.length},

                \x1b[36mFake Chains: ${files.customData.fakeBurstSliders.length},

                \x1b[36mEnvironment Objects: ${files.customData.environment.length},
                    
                \x1b[36mCustom Events: ${files.customData.customEvents.length}
                    \x1b[0m
            `)
        }

        if(!vannilaData && !customData) {
            console.log(`
            \x1b[1;36mVanilla Data:
                \x1b[0m
                    \x1b[32mNotes: ${files.colorNotes.length},

                    \x1b[32mWalls: ${files.obstacles.length},

                    \x1b[32mBombs: ${files.bombNotes.length},

                    \x1b[32mChains: ${files.burstSliders.length}

                    \x1b[32mArcs: ${files.sliders.length}

            \x1b[1;36mCustom Data:
                \x1b[0m
                    \x1b[32mFake Notes: ${files.customData.fakeColorNotes.length},
            
                    \x1b[32mFake Walls: ${files.customData.fakeObstacles.length},
            
                    \x1b[32mFake Bombs: ${files.customData.fakeBombNotes.length},
            
                    \x1b[32mFake Chains: ${files.customData.fakeBurstSliders.length},
            
                    \x1b[32mEnvironment Objects: ${files.customData.environment.length},
                                
                    \x1b[32mCustom Events: ${files.customData.customEvents.length}
                        \x1b[0m
            `)
        }
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
        let name = this.configuration.infoFile._songName +`.zip`
        name = name.replaceAll(" ", "_")

        console.log(name)
        
        const files: string[] = []

        if(typeof filenames == 'string') {
            files.push(filenames+'.dat')
        } else {
            filenames.forEach(x => {
                files.push(x+'.dat')
            })
        }

        const x = [...Deno.readDirSync('./')]

        x.forEach(file => {
            if(file.name.endsWith('.ogg')) {
                files.push(file.name)
            } else if(file.name.endsWith('.png')) {
                files.push(file.name)
            }
        })

        files.push('Info.dat')

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
    get geometry() { return this.configuration.file.customData.environment as Array<defaultGeometryJson>}
    get customEvents() { return this.configuration.file.customData.customEvents as Array<defaultCustomEventJson> }
    get fakeNotes() { return this.configuration.file.customData.fakeColorNotes as Array<defaultNoteJson> }
    get fakeWalls() { return this.configuration.file.customData.fakeObstacles as Array<defaultObstacleJson> }
    get fakeBombs() { return this.configuration.file.customData.fakeBombNotes as Array<defaultBombJson> }

    get materials() { return this.configuration.file.customData.materials as Record<any, materialType> }
}


export function activeDiff() {
    return file as beatmapFile //make more accessible throughout the library
}
