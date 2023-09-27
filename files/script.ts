import { Map } from './src/main.ts'

//#region Map initialization
const map = new Map("ExpertPlusLawless", "ExpertPlusStandard")



//#region map settings and script end
map.config({
    formatJsonFile: false
})
map.log()
map.end()
