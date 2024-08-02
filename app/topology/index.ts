import { TopologyNode } from "@topology-foundation/node";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { IGameBoard, GameBoard } from "./objects/gameboard";
import { GCounter, GSet, PNCounter, TwoPSet } from "@topology-foundation/crdt";

import { handleGameMessages, handleObjectUpdate } from "./handlers";
import { type Player } from "../../utils/playersData";

// export const OBJECT_ID = "topology::space_invaders";
// export const PRESENCE_GROUP = "space_invaders::presence";

let node: TopologyNode;
let gameboardCRO: IGameBoard;
export let nodeId: string;
let peers: string[] = [];
let discoveryPeers: string[] = [];
let objectPeers: string[] = [];

  
  //criar uma funcao que inicia depois do node.start() e guarda jogadores

  const render = () => {
    const peers_element = <HTMLDivElement>document.getElementById("peers");
    peers_element.innerHTML = "[" + peers.join(", ") + "]";
  
    const discovery_element = <HTMLDivElement>(
      document.getElementById("discovery_peers")
    );
    discovery_element.innerHTML = "[" + discoveryPeers.join(", ") + "]";
  
    const object_element = <HTMLDivElement>(
      document.getElementById("object_peers")
    );
    object_element.innerHTML = "[" + objectPeers.join(", ") + "]";
  
    async function init() {
    node = new TopologyNode();
    await node.start();  
    nodeId = node.getPeerId();
  
    node.addCustomGroupMessageHandler((e) => {
      handleGameMessages(gameboardCRO, e);
      peers = node.networkNode.getAllPeers();
      discoveryPeers = node.networkNode.getGroupPeers("topology::discovery");
      if (gameboardCRO) {
        objectPeers = node.networkNode.getGroupPeers(gameboardCRO.getObjectId());
      }
      render();
    });
    
    
    const handleShoot = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        gameboardCRO.shoot(nodeId, ); //how to parse [PNCounter, PNCounter] as str?
      }
    };

    document.addEventListener('keydown', handleShoot);

    let create_button = <HTMLButtonElement>document.getElementById("create");
    create_button.addEventListener("click", () => {
      gameboardCRO = new GameBoard(node.networkNode.peerId);
      node.createObject(gameboardCRO);
  
      (<HTMLSpanElement>document.getElementById("gameboardId")).innerText =
        gameboardCRO.getObjectId();
      render();
    });
  
    let connect_button = <HTMLButtonElement>document.getElementById("connect");
    connect_button.addEventListener("click", async () => {
      let croId = (<HTMLInputElement>document.getElementById("gameIdInput"))
        .value;
      try {
        await node.subscribeObject(croId, true);  
        let object: any = node.getObject(croId);

        // object["gameboard"] = object["gameboard"].map((x: any) =>
        //   x.map((y: any) => {

        //     y["red"] = Object.assign(new GCounter({}), y["red"]);
        //     y["green"] = Object.assign(new GCounter({}), y["green"]);
        //     y["blue"] = Object.assign(new GCounter({}), y["blue"]);
        //     return Object.assign(new Pixel(node.networkNode.peerId), y);
        //   }),
        // );
        
        //also didnt figure out what this piece of code is doing
        gameboardCRO = Object.assign(
          new GameBoard(node.networkNode.peerId),
          object,
        );
  
        (<HTMLSpanElement>document.getElementById("gameId")).innerText = croId;
        render();
      } catch (e) {
        console.error("Error while connecting with CRO", croId, e);
      }
    });
  }
  
  init();
}