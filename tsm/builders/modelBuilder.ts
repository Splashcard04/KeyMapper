import { Json } from '../types.ts'
import { environmentBuilder } from './environmentBuilder.ts'
import { geometryBuilder, materialType } from './geometryBuilder.ts'
import { WallBuilder } from './wallBuilder.ts'
import { animateTrackBuilder } from './animateTrackBuilder.ts'

type groupType = geometryBuilder | WallBuilder | environmentBuilder

export class modelBuilder {
    c: Json = {}
    a: Array<{
        track: string,
        object: groupType
    }> = []
    constructor(public object: groupType) {
        return this
    }

    addMaterialGroup(track: string, object: groupType) { 
        this.a.push({
            track: track,
            object: object
        })
        return this
    }

    static(path: string) {
        this.c.path = path
        const file = JSON.parse(Deno.readTextFileSync(path+'.rmmodel'))

        file.objects.forEach((x: Json) => {
            this.a.forEach(a => {
                if(a.track == x.track) {
                    a.object
                    .position(x.pos)
                    .localRotation(x.rot)
                    .scale(x.scale)
                    .push()
                } else {
                    this.object
                    .position(x.pos)
                    .localRotation(x.rot)
                    .scale(x.scale)
                    .push()
                }
            })
        })
    }


}