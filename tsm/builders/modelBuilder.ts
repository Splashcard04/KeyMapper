import { Json } from '../types.ts'
import { geometryBuilder, materialType } from './geometryBuilder.ts'

export class modelToGeometryBuilder {
    private config: Json = {
        materialGroups: []
    }

    type(type: "Cube" | "Triangle" | "Quad" | "Cyliner" | "Capsule" | "Sphere") {
        this.config.type = type
        return this
    }

    material(material: string | materialType) {
        this.config.material = material
        return this
    }

    static(path: string) {
        const file = JSON.parse(Deno.readTextFileSync(path+'.rmmodel'))
        this.config.file = file
        this.config.path = path
        file.objects.forEach((x: Json) => {
            new geometryBuilder(this.config.type ?? "Cube", this.config.material ?? { shader: "Standard" })
            .position(x.pos)
            .localRotation(x.rot)
            .scale(x.scale)
            .push()
        })

        this.config.materialGroups.forEach((x: Json) => {
            file.objects.forEach((y: Json) => {
                if(y.track == x.track) {
                    new geometryBuilder(x.type, x.material)
                    .position(y.pos)
                    .localRotation(y.rot)
                    .scale(y.scale)
                    .push()
                }
            })
        })
        return this
    }

    addMaterialGroup(track: string, material?: materialType | string, type?: "Cube" | "Triangle" | "Quad" | "Cyliner" | "Capsule" | "Sphere") {

        this.config.materialGroups.push({
            track: track,
            material: material ?? { shader: "Standard" },
            type: type ?? "Cube"
        })
        return this
    }
}
