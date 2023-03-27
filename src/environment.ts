import { file } from './map'
import { json, lookupMethod, Vec3 } from './types'

export class Environment {
    
    animJson: json = {}
    json: json = {}

    constructor(id: string, lookup: lookupMethod) {
        this.json = { 'id': id, 'lookup': lookup }
    }

    position(position: Vec3) {
        if(typeof(position[0]) == 'number') {
            this.json.position = position
        } else {
            this.animJson.position = position
        }
    }

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