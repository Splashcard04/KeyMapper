import { Json, reqMods, suggestMods } from './types.ts'

export let file = JSON.parse(Deno.readTextFileSync('ExpertPlusLawless.dat'))

type logType = {
    customData?: boolean,
    vannilaData?: boolean
}

type mapConfig = {
    formatJsonFile?: boolean,
    requirements?: reqMods[],
    suggestions?: suggestMods[],
}

export class Map {
    configuration: Json = {}
    constructor(input: string, output: string) {
        this.configuration.input = input+'.dat'
        this.configuration.output = output+'.dat'
        file = JSON.parse(Deno.readTextFileSync(this.configuration.input))
        this.configuration.file = file
        file.customData = {
            environent: [], customEvents: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {}, pointDefinitions: {}
        }

        const infoFile = JSON.parse(Deno.readTextFileSync("./Info.dat"))
        this.configuration.infoFile = infoFile
    }

    config(config: mapConfig) {

        const format = config.formatJsonFile ?? false
        if(format == true) this.configuration.formatFile = true
        else this.configuration.formatFile = false

        this.configuration.infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if(this.configuration.output.indexOf(x._beatmapCharacteristicName) !== -1) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if(this.configuration.output.indexOf(y._difficulty) !== -1) {
                        y._customData = {
                            _requirements: config.requirements ?? [],
                            _suggestions: config.suggestions ?? []
                        }
                    }
                })
            }
        })
    }

    end() {
        if(this.configuration.formatFile === true) {
            Deno.writeTextFileSync(this.configuration.output, JSON.stringify(this.configuration.file, null, 4))
        } else {
            Deno.writeTextFileSync(this.configuration.output, JSON.stringify(this.configuration.file, null, 0))
        }
        Deno.writeTextFileSync('Info.dat', JSON.stringify(this.configuration.infoFile, null, 4))
    }

    get notes() { return this.configuration.file.colorNotes }
    get walls() { return this.configuration.file.obstacles }
    get bombs() { return this.configuration.file.bombNotes }
    get arcs() { return this.configuration.file.sliders }
    get chains() { return this.configuration.file.burstSliders }
    get lightEvents() { return this.configuration.file.basicBeatmapEvents }

    get environment() { return this.configuration.file.customData.environment }
    get customEvents() { return this.configuration.file.customData.customEvents }
    get fakeNotes() { return this.configuration.file.customData.fakeColorNotes }
    get fakeWalls() { return this.configuration.file.customData.fakeObstacles }
    get fakeBombs() { return this.configuration.file.customData.fakeBombNotes }

    get materials() { return this.configuration.file.customData.materials }
}

export function activeDiff() {
    return file
}