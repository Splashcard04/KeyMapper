import { paths, ease, Vec3Keyframes, Vec1Keyframes, Vec4Keyframes } from "./types.ts";
import { assignPlayerTrackBuilder } from "./builders/assignPlayerToTrackBuilder.ts"
import { animateTrackBuilder } from "./builders/animateTrackBuilder.ts"
import { animateComponentBuilder } from "./builders/animateComponentBuilder.ts"

export function r(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function rgb(r: number, g: number, b: number, a?: number) {
    return [r/255, g/255, b/255, a ?? 1]
}

export function exportZip(diff: string | paths | string[] | paths[]) {
    const name = JSON.parse(Deno.readTextFileSync('info.dat'))._songName

    if(typeof diff == 'string') { 
        Deno.run({ cmd: ['zip', '-r', `${name} (${diff}).zip`, diff] })
    } else {
        let zippedFiles: Array<string> = []
        diff.forEach(x => {
            zippedFiles.push(x)
        })
        Deno.run({ cmd: ['zip', '-r', `${name}.zip`, zippedFiles] })
    }
}

export function animatePlayer(time: number, duration: number, forTrack: (x: animateTrackBuilder) => void) {
    const r = Math.random() * 10 - Math.random()
    const track = new animateTrackBuilder(`${r}`, time, duration)
    forTrack(track)
    track.push()

    new assignPlayerTrackBuilder(time, `${r}`).push()
}

export function adjustFog(time: number, duration: number, forFog: (x: animateComponentBuilder) => void) {
    const r = Math.random() * 10 - Math.random()
    const idk = new animateComponentBuilder(time, duration, `${r}`)
    forFog(idk)
    idk.push()
}