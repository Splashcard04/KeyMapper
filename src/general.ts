import { activeDiff } from "./map.ts";
import { animateComponentBuilder } from "./builders/animateComponentBuilder.ts";
import { noteBuilder } from "./builders/noteBuilder.ts";
import { bombBuilder } from "./builders/bombBuilder.ts";
import { chainBuilder } from "./builders/chainBuilder.ts";
import { arcBuilder } from './builders/arcBuilder.ts';
import { WallBuilder } from "./builders/wallBuilder.ts"; 

export function r(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function rgb(r: number, g: number, b: number, a?: number) {
    return [r/255, g/255, b/255, a ?? 1]
}

export function adjustFog(time: number, duration: number, forFog: (x: animateComponentBuilder) => void) {
    /**
     * animate fog between two time points
     * @param { number } time the time to start animating fog
     * @param { number } duration the duration of the animation
     * @param { animateComponentBuilder } forFog the data to apply to the fog
     */
    const r = Math.random() * 10 - Math.random()
    const idk = new animateComponentBuilder(time, duration, `${r}`)
    forFog(idk)
    idk.push()
}



export function notesBetween(time: number, timeEnd: number, forNote: (n: noteBuilder) => void) {
    /**
     * apply customData to notes between two points in time
     * @param { number } time the time to start applying custom data to notes
     * @param { timeEnd } timeEnd the time to stop applying custom data to notes
     * @param { noteBuilder } forNote the data to apply to each note
     */
    activeDiff().colorNotes.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forNote(x)
        }
    })
    activeDiff().customData.fakeColorNotes.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forNote(x)
        }
    })
}

export function chainsBetween(time: number, timeEnd: number, forChain: (c: chainBuilder) => void) {
    /**
     * apply customData to chains between two points in time
     * @param { number } time the time to start applying custom data to chains
     * @param { timeEnd } timeEnd the time to stop applying custom data to chains
     * @param { chainBuilder } forChain the data to apply to each chain
     */
    activeDiff().burstSliders.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forChain(x)
        }
    })

    activeDiff().customData.fakeBurstSliders.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forChain(x)
        }
    })
}

export function bombsBetween(time: number, timeEnd: number, forBomb: (b: bombBuilder) => void) {
    /**
     * apply customData to bombs between two points in time
     * @param { number } time the time to start applying custom data to bombs
     * @param { timeEnd } timeEnd the time to stop applying custom data to bombs
     * @param { bombBuilder } forBomb the data to apply to each bomb
     */
    activeDiff().bombNotes.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forBomb(x)
        }
    })
    activeDiff().customData.fakeBombNotes.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forBomb(x)
        }
    })
}

export function arcsBetween(time: number, timeEnd: number, forArc: (a: arcBuilder) => void) {
    /**
     * apply customData to arcs between two points in time
     * @param { number } time the time to start applying custom data to arcs
     * @param { timeEnd } timeEnd the time to stop applying custom data to arcs
     * @param { arcBuilder } forArc the data to apply to each arc
     */
    activeDiff().sliders.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forArc(x)
        }
    })
}

export function wallsBetween(time: number, timeEnd: number, forWall: (w: WallBuilder) => void) {
    /**
     * apply data to walls between two points in time
     * @param { number } time the time to start applying custom data to walls
     * @param { timeEnd } timeEnd the time to stop applying custom data to walls
     * @param { WallBuilder } forWall the data to apply to each wall
     */
    activeDiff().obstacles.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forWall(x)
        }
    })

    activeDiff().customData.fakeObstacles.forEach((x: any) => {
        if(x.b >= time && x.b <= timeEnd) {
            forWall(x)
        }
    })
}

export function objectsBetween(time: number, timeEnd: number, forObject: (o: noteBuilder | bombBuilder | chainBuilder | arcBuilder) => void) {
    /**
     * apply data to objects between two points in time
     * @param { number } time the time to start applying custom data to objects
     * @param { timeEnd } timeEnd the time to stop applying custom data to objects
     * @param { (o: noteBuilder) } forObject the data to apply to each object
    */
    notesBetween(time, timeEnd, forObject)
    bombsBetween(time, timeEnd, forObject)
    chainsBetween(time, timeEnd, forObject)
    arcsBetween(time, timeEnd, forObject)
}

export function loop(repeat: number, code: (i: number) => void) {
    /**please dont use this */
	for (let i = 0; i < repeat; i++) code(i);
}