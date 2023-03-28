import { customDataType } from './types'

export class customDataBuilder {
    
}

export class customData {
    constructor(data: customDataType) {
        return data as customDataType
    }
}