import { environmentBuilder } from '../../builders/environmentBuilder.ts';
import { Json } from '../../types.ts';

type lookup = "Contans" | "Regex" | "EndsWith" | "StartsWith" | "Exact"

export class despawnerBuilder {
    private config: Json = {}
    constructor(lookup?: lookup, ids?: string[]) {
        this.config.lookup = lookup ?? "Contains"
        this.config.ids = ids ?? ["Environment"]
        return this
    }

    lookup(lookup: lookup) { this.config.lookup = lookup; return this }
    ids(ids: string[]) { this.config.ids = ids; return this }

    restore(ids: string[]) { this.config.restore = ids; return this }
    hardDespawn(ids: string[]) { this.config.hardDespawn = ids; return this }

    push() {
        this.config.ids.forEach(x => {
            new environmentBuilder(x, this.config.lookup)
            .position([-9999, -9999, -9999])
            .push()
        })

        if(this.config.restore) {
            this.config.restore.forEach(x => {
                new environmentBuilder(x, this.config.lookup)
                .position([0, 0, 0])
                .active(true)
                .push()
            })
        }

        if(this.config.hardDespawn) {
            this.config.hardDespawn.forEach(x => {
                new environmentBuilder(x, this.config.lookup)
                .active(false)
                .push()
            })
        }
    }

}