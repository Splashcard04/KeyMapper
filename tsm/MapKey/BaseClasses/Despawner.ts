import { Environment } from '../../BaseClasses/Environment.ts'

type despawnerType = {
    lookup?: "Contains" | "Regex" | "EndsWith" | "StartsWith" | "Exact",
    ids?: string[],
    restore?: string[],
    hardDespawn?: string[]
}

export class Despawner {
    constructor(public x: despawnerType) {}

    push() {
        if(!this.x.ids) this.x.ids = ["Environment"]
        this.x.ids?.forEach(x => {
            new Environment({
                id: x,
                lookup: this.x.lookup,
                position: [-9999, -9999, -9999]
            }).push()
        })

        if(this.x.restore) {
            this.x.restore.forEach(x => {
                new Environment({
                    id: x,
                    lookup: this.x.lookup,
                    position: [0, 0, 0],
                    active: true
                }).push()
            })
        }

        if(this.x.hardDespawn) {
            this.x.hardDespawn.forEach(x => {
                new Environment({
                    id: x,
                    lookup: this.x.lookup,
                    active: false
                }).push()
            })
        }
    }
}