import { Json, configType } from './types.ts'

export let file = 'No File Found!'

export class Map {
    json: Json = {}
    constructor(input: string, output: string) {
        this.json.input = input+'.dat'
        this.json.output = output+'.dat'
    }

    initialize() {
        file = JSON.parse(Deno.readTextFileSync(input+'dat'))
        this.json.file = file
        file.customData = {
            environment: [], customEvents: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: []
        }
    }

    config(config: configType) {
        this.json.format = config.formatFile ?? false
    }

    finalize() {
        if(this.json.format === true) Deno.writeTextFileSync(this.json.output, JSON.stringify(file, null, 4))
        else Deno.writeTextFileSync(this.json.output, JSON.stringify(file, null, 0))
    }
}

export function activeDiff() {
    return file
}