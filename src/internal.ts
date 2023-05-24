import { Json } from './types.ts'

/*
  This file is full of functions to be used internally throughought the library
*/

export function log(message: string, errorValue?: 'error' | 'warn' | 'success' | 'neutral') {
    let color = ''
    if(errorValue == 'error') color = `\x1b[1m\x1b[31m`
    if(errorValue == 'warn') color = `\x1b[1m\x1b[33m`
    if(errorValue == 'success') color = `\x1b[1m\x1b[32m`

    console.log(`${color}[KeyMapper]: ${message}\x1b[1m\x1b[37m`)
}

export type beatmapFile = {
  "version": string,
  "bpmEvents": Json[],
  "rotationEvents": Json[],
  "colorNotes": Json[],
  "bombNotes": Json[],
  "obstacles": Json[],
  "sliders": Json[],
  "burstSliders": Json[],
  "waypoints": Json[],
  "basicBeatmapEvents": Json[],
  "colorBoostBeatmapEvents": Json[],
  "lightColorEventBoxGroups": Json[],
  "lightRotationEventBoxGroups": Json[],
  "lightTranslationEventBoxGroups": Json[],
  "basicEventTypesWithKeywords": Json,
  "useNormalEventsAsCompatibleEvents": boolean,
  "customData": {
    environment: Json[],
    fakeColorNotes: Json[],
    fakeBombNotes: Json[],
    fakeObstacles: Json[],
    customEvents: Json[],
    fakeBurstSliders: [], 
    materials: {}, 
    pointDefinitions: {}
  }
}