import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { players, PlayerData } from "../../utils/playersData";
import type { Player, PlayerID } from "../../utils/playersData";
import { addOrUpdatePlayer } from "../../utils/playersManager";
import { type IGameBoard } from "./objects/gameboard";
import { GameBoard } from ",/objects/gameboard";

// import { OBJECT_ID, PRESENCE_GROUP } from ".";

// export function handlePresenceMessages(e: any) {
//     if (e.detail.msg.topic !== PRESENCE_GROUP) return;
//     const input = uint8ArrayToString(e.detail.msg.data);
//     const player: Player = JSON.parse(input);
//     addOrUpdatePlayer(player);
// }

//idk how presence works so lets tryna do the
//handling messages way

export const handleGameMessages = (gameboard: IGameBoard, e: any) => {
    if (e.detail.msg.topic === "topology::discovery") return;
    const input = uint8ArrayToString(e.detail.msg.data);
    const message = JSON.parse(input);
    switch (message["type"]) {
      case "object_update": {
        const fn = uint8ArrayToString(new Uint8Array(message["data"]));
        handleObjectUpdate(gameboard, fn);
        break;
      }
      default: {
        break;
      }
    }
};

  function handleObjectUpdate(gameboard: IGameBoard, fn: string) {
    // In this case we only have shoot
    
    // `shoot(${node.getPeerId()}, [${[x, y]}], [${painting}])`
    let args = fn.replace("shoot(", "").replace(")", "").split(", ");
    try {
        gameboard.shoot(args[0], args[1]); // parsing problem
    } catch (e) {
      console.error(e);
    }
}