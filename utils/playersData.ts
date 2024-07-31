export type PlayerID = string;

export type Direction = "LEFT" | "RIGHT" | "STOPPED";

export const randomCoordinate = () => Math.random() * 10 - 5;

export interface Player {
    id: PlayerID;
    position: {x: number, y: number};
    direction: Direction;
    lives: number;
}

export class PlayerData implements Player {
    id: PlayerID;
    position: {x: number, y: number};
    direction: Direction;
    lives: number;

    private static readonly FIXED_Y_POSITION = 0; // Fixed y position for all players

    constructor(
        player?: Player,
        id?: PlayerID,
        x?: number,
        direction?: Direction,
    ) {
        if(player){
            this.id = player.id;      
            this.position = { ...player.position };
            this.direction = player.direction;
            this.lives = player.lives;
            return;
        }
        // if (!id) throw new Error("neither player nor id were provided");

        this.id = id;
        this.position = {
            x: x ?? randomCoordinate(),
            y: PlayerData.FIXED_Y_POSITION,
        };
        this.direction = direction ?? "STOPPED"; 
        this.lives = 3;
    }
    updatePosition(x:number){
        this.position.x = x;
    }

    updateDirection(d: Direction){
        this.direction = d;
    }

    loseLife() {
        this.lives -= 1;
    }
}

export const players: Map<PlayerID, PlayerData> = new Map();
