import { TopologyNode } from "@topology-foundation/node";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { IGameBoard, GameBoard } from "./objects/gameboard";
import { Player } from "./objects/player";
import { GCounter, GSet, PNCounter, TwoPSet } from "@topology-foundation/crdt";

import { handleGameMessages, handleObjectUpdate } from "./handlers";

// export const OBJECT_ID = "topology::space_invaders";
// export const PRESENCE_GROUP = "space_invaders::presence";
//idk how presence works, maybe search for it 

let node: TopologyNode;
let gameboardCRO: IGameBoard;
export let nodeId: string;
let peers: string[] = [];
let discoveryPeers: string[] = [];
let objectPeers: string[] = [];

  // (*)
  //need to create a function that instantiates a player when he joins the game session
  //how to do that? how do I know a player joined a game session?
  //if I do that, I can just append to my GameBoard.players


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
    
    //functions to make the player and the spaceships to move (and shoot)

    const handleShoot = (player: Player) => (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        gameboardCRO.shoot(nodeId, [player.position, new PNCounter(new GCounter({}), new GCounter({}))]);
      }
    };

    document.addEventListener('keydown', handleShoot(gameboardCRO.players[playerId]));
    //here how do I know that the specific player is pressing the keyboard?

    const createHandlePlayerMove = (player: Player) => (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        gameboardCRO.players[playerId].moveright(nodeId);
        
      }
      if (event.key === 'ArrowLeft') {
        gameboardCRO.players[playerId].moveleft(nodeId);
        
      }
    };
    
    document.addEventListener('keydown', createHandlePlayerMove(playerId));

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
//I guess that the logic to insert a player in the game room is missing  
  
  init();
}