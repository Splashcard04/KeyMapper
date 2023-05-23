import { Json } from '../types.ts'
import { environmentBuilder } from './environmentBuilder.ts'
import { geometryBuilder, materialType } from './geometryBuilder.ts'
import { WallBuilder } from './wallBuilder.ts'
import { animateTrackBuilder } from './animateTrackBuilder.ts'

type groupType = geometryBuilder | WallBuilder | environmentBuilder

export class modelBuilder {
    private c: Json = {}
    private a: Array<{
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

    animate(...switches: [path: string, time: number, timeEnd: number][]) {
        switches.forEach(x => {
            const file = JSON.parse(Deno.readTextFileSync(x[0]+'.rmmodel'))

            function isAnimated(x: Json) {
                if(typeof x[0] == 'number') {
                    return false
                } else {
                    return true
                }
            }

            file.objects.forEach((y: Json) => {


                    const hash = [Math.floor(Math.random() * 10) * 15 - Math.floor(Math.random() * -3)].toString()

                    new animateTrackBuilder(`Model${hash}`, x[1], x[2])
                    .position([[-9999, -9999, -9999, -0.0001], y.pos, [-9999, -9999, -9999, 1.000001]])
                    .localRotation(y.rot)
                    .scale(y.scale)
                    .push()

                    this.a.forEach(z => {
                        if(z.track == y.track) {
                            z.object
                            .position(y.pos)
                            .localRotation(y.rot)
                            .scale(y.scale)
                            .track(`Model${hash}`)
                            .push()
                        } else {
                            this.object
                            .position(y.pos)
                            .localRotation(y.rot)
                            .scale(y.scale)
                            .track(`Model${hash}`)
                            .push()
                        }
                    })

                
            })
        })
    }


}

