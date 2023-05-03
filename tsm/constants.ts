import { activeDiff } from "./map.js";
import { Json } from "./types.ts";

export enum NoteType { red, blue }

export enum lightType {
	backLasers = 0,
	ringLights = 1,
	leftLasers = 2,
	rightLasers = 3,
	centerLasers = 4,
	extraLeft = 6,
	extraRight = 7,
	billieLeft = 10,
	billieRight = 11,
	gagaLeft = 18,
	gagaRight = 19,
}

export enum lightEventType {
    off = 0,
    on = 1,
    fade = 2,
    flash = 3
}

export enum cutDirection {
    up,
    down,
    left,
    right,
    upLeft,
    upRight,
    downLeft,
    downRight,
    any
}
