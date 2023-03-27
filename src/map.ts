import * as fs from 'fs'
import { json, configType } from './types'

export let file = JSON.parse(fs.readFileSync('ExpertPlusLawless.dat'))

export class Map {
    objects: json = {}
    constructor(input: string, output: string) {
        this.objects.input = input+'.dat';
        this.objects.output = output+'.dat';
        const file = JSON.parse(fs.readFileSync(input+'.dat'))
        this.objects.file = file
    }

    config(settings: configType) {
        this.objects.format = settings.formatFile
    }

    save() {
        if(!this.objects.format || this.objects.format == false) {
            fs.writeFileSync(this.objects.output, JSON.stringify(this.objects.file, null, 4))
        } else {
            fs.writeFileSync(this.objects.output, JSON.stringify(this.objects.file, null, 0))
        }
    }
}