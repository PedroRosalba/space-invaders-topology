import { TopologyNode } from "@topology-foundation/node";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { GameBoard } from "./objects/gameboard";

// import { handleCanvasMessages, handlePresenceMessages } from "./handlers";

import { type Player } from "../../utils/playersData";

// import { addSprayData, type SprayData } from "$lib/store/player";

export const OBJECT_ID = "topology::space_invaders";
export const PRESENCE_GROUP = "space_invaders::presence";

// export const WIDTH = 4000;
// export const HEIGHT = 3000;

let node: TopologyNode;
let gameboard: GameBoard;
export let nodeId: string;

export async function topologyInit() {
  node = new TopologyNode();
  await node.start();

    //criar uma funcao que inicia depois do node.start() e guarda jogadores
    
  nodeId = node.getPeerId();
  
}
//   // TODO await for peer connection
//   gameboard = new GameBoard(node.getPeerId(), WIDTH, HEIGHT);

//   canvas.id = OBJECT_ID;

//   node.createObject(canvas);
//   node.addCustomGroupMessageHandler((e) => handleCanvasMessages(canvas, e));

//   node.addCustomGroup(PRESENCE_GROUP);
//   node.addCustomGroupMessageHandler((e) => handlePresenceMessages(e));

//   while (true) {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 15000));
//       node.syncObject(OBJECT_ID);
//       let object: ICanvas | null = getObject(OBJECT_ID);
//       if (!object) continue;
//       canvas = object;
//       // TODO fix this, might be adding on top of existing sprays
//       for (let spray of canvas.getSprays().set()) {
//         const tokens = spray.split(",");
//         const sprayData: SprayData = {
//           id: parseInt(tokens[3].replace("]", ""), 10),
//           offset: {
//             x: parseInt(tokens[1].replace("[", ""), 10),
//             y: parseInt(tokens[2].replace("]", ""), 10),
//           },
//           timestamp: parseInt(tokens[0].replace("[", ""), 10),
//         };
//         addSprayData(sprayData);
//       }
//     } catch (e) {
//       console.error(e);
//       break;
//     }
//   }
// }

// export function getObject(id: string): ICanvas | null {
//   let object: any = node.getObject(id);
//   if (!object) return null;
//   return Object.assign(new Canvas(node.getPeerId(), 0, 0), object);
// }

// export function addSpray(
//   timestamp: number,
//   offset: [number, number],
//   sprayType: number,
// ) {
//   if (
//     canvas
//       .getSprays()
//       .lookup(`[${timestamp},[${offset[0]},${offset[1]}],${sprayType}]`)
//   )
//     return;
//   canvas.addSpray(timestamp, offset, sprayType);
//   node.updateObject(canvas, `addSpray(${timestamp},[${offset}],${sprayType})`);
// }

// export function sendPresence(player: Player) {
//   node.sendGroupMessage(
//     PRESENCE_GROUP,
//     uint8ArrayFromString(JSON.stringify(player)),
//   );
// }