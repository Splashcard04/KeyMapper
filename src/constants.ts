import { activeDiff } from "./map.ts";
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
    /**enum for light event values */
    off,
    on,
    fade,
    flash
}

export enum cutDirection {
    /**enum for note cut direction */
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


export const Env = {
    /**Environment ID constants for commonly used environment objects */
    BTS: {
        doorLight: "MagicDoorSprite",
		upperClouds: "HighCloudsGenerator$",
		lowerClouds: "LowCloudsGenerator$",
		allClouds: "Clouds$",
    },
    Billie: {
        directionalLight: "Day\\.\\[\\d+\\]\\w+Front$",
		solidLaser: "\\w+\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+L\\.\\[\\d+\\]\\w+LH$",
		sun: "Sun$",
		clouds: "Clouds$",
		smoke: "BigSmokePS$",
		railLight: "t\\.\\[\\d+\\]Neon\\w+L$",
		rain: "Rain$",
    },
    Gaga: {
        Aurora: "AuroraSecondary$",
		Lightning: "1L\\.\\[\\d+\\]\\w+\\.\\[\\d+\\]LightningWithTarget$",
		solidLaser: "FrontLaserL$",
		directionalLight: "DirectionalLightFront$",
		gagaLogo: "[^Logo]{4}\\.\\[\\d+\\]Logo$",
    },
    Spooky: {
        Moon: "Moon$",
        Tree: "Tree1 \\(\\1\\)$",
        Tree2: "Tree2 \\(\\1\\)$",
        Grave: "Grave$",
        Grave2: "Grave1$",
        Hand: "\\[\\158\\]ZombieHand \\(1\\)",
        Castle: "Castle$",
        Crow: "\\[\\156\\]Crow\\.\\[\\0]Crow$"
    },
    Rocket: {
        CarL: "RocketCarL$",
        CarR: "RocketCarR$"
    },
    All: {
        cinemaScreen: "CinemaScreen$",
		cinemaDirLight: "CinemaDirectionalLight$",
		mirror: "Place\\.\\[\\d+\\]Mirror$",
		playerPlatform: "PlayersPlace$",
    }
}

