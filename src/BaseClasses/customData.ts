import { customDataType } from "../types.ts"

export class customData {
    constructor(data: customDataType) {
        return data as customDataType
    }
}