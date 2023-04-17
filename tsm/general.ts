import { paths } from "./types.ts";

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
        Deno.run({ cmd: ['zip', '-r', `${name} (${zippedFiles}).zip`, x] })
    }
}