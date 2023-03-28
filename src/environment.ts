import { file } from './map'
import { json, lookupMethod, Vec3, customDataType } from './types'

export class Environment {
    
    animJson: json = {}
    json: json = {}

    constructor(id: string, lookup: lookupMethod) {
        this.json = { 'id': id, 'lookup': lookup }
    }

    data(data: customDataType) {
        this.json = data
        return this
    }

    position(pos: Vec3) { this.json.position = pos }

    scale(scale: Vec3) {
        if(typeof(scale[0]) == 'number') {  
            this.json.scale = scale
        } else {
            this.animJson.scale = scale
        }
    }

    push() {
        const track = `track${Math.random() * 92}`
        if(!this.json.track) {
            this.json.track = track
        }

        file.customData.environment.push(this.json)
        file.customData.customEvents.push({ animation: this.animJson})
    }
}