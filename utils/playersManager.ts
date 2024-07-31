import { players, PlayerData } from "./playersData";
import type { Player, PlayerID } from "./playersData";

export function addOrUpdatePlayer(input: Player): void {
  const player = players.get(input.id);
  if (player) {
    player.updatePosition(input.position.x);
    player.updateDirection(input.direction);
    player.loseLife(); 
  } else {
    players.set(input.id, new PlayerData(input));
  }
}

export function removePlayer(input: Player): void {
  if(input.lives == 0){
        players.delete(input.id);
    }
}