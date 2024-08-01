import { TopologyNode } from "@topology-foundation/node";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { IGameBoard, GameBoard } from "./objects/gameboard";
import { GCounter, GSet, PNCounter, TwoPSet } from "@topology-foundation/crdt";

import { type Player } from "../../utils/playersData";

// export const OBJECT_ID = "topology::space_invaders";
// export const PRESENCE_GROUP = "space_invaders::presence";

let node: TopologyNode;
let gameboardCRO: IGameBoard;
export let nodeId: string;
let peers: string[] = [];
let discoveryPeers: string[] = [];
let objectPeers: string[] = [];

export async function topologyInit() {
  node = new TopologyNode();
  await node.start();  
  nodeId = node.getPeerId();
  
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
  
    // if (!canvasCRO) return;
    // const canvas = canvasCRO.canvas;
    // const canvas_element = <HTMLDivElement>document.getElementById("canvas");
    // canvas_element.innerHTML = "";
    // canvas_element.style.display = "inline-grid";
  
    // canvas_element.style.gridTemplateColumns = Array(canvas.length)
    //   .fill("1fr")
    //   .join(" ");
  
    // for (let x = 0; x < canvas.length; x++) {
    //   for (let y = 0; y < canvas[x].length; y++) {
    //     let pixel = document.createElement("div");
    //     pixel.id = `${x}-${y}`;
    //     pixel.style.width = "25px";
    //     pixel.style.height = "25px";
    //     pixel.style.backgroundColor = `rgb(${canvas[x][y].color()[0]}, ${canvas[x][y].color()[1]}, ${canvas[x][y].color()[2]})`;
    //     pixel.style.cursor = "pointer";
    //     pixel.addEventListener("click", () => paint_pixel(pixel));
    //     canvas_element.appendChild(pixel);
    //   }
    // }
  };
  
  // const random_int = (max: number) => Math.floor(Math.random() * max);
  
  // async function paint_pixel(pixel: HTMLDivElement) {
  //   const [x, y] = pixel.id.split("-").map((v) => parseInt(v, 10));
  //   const painting: [number, number, number] = [
  //     random_int(256),
  //     random_int(256),
  //     random_int(256),
  //   ];
  //   canvasCRO.paint(node.networkNode.peerId, [x, y], painting);
  //   const [r, g, b] = canvasCRO.pixel(x, y).color();
  //   pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
  //   node.updateObject(
  //     canvasCRO,
  //     `paint(${node.networkNode.peerId}, [${[x, y]}], [${painting}])`,
  //   );
  // }
  
  async function init() {
    await node.start();
  
    node.addCustomGroupMessageHandler((e) => {
      handleCanvasMessages(canvasCRO, e);
      peers = node.networkNode.getAllPeers();
      discoveryPeers = node.networkNode.getGroupPeers("topology::discovery");
      if (canvasCRO) {
        objectPeers = node.networkNode.getGroupPeers(canvasCRO.getObjectId());
      }
      render();
    });
    
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
        // TODO remove the need to click to time for subscribe and fetch
  
        // let object: any = node.getObject(croId);
        // object["canvas"] = object["canvas"].map((x: any) =>
        //   x.map((y: any) => {
        //     y["red"] = Object.assign(new GCounter({}), y["red"]);
        //     y["green"] = Object.assign(new GCounter({}), y["green"]);
        //     y["blue"] = Object.assign(new GCounter({}), y["blue"]);
        //     return Object.assign(new Pixel(node.networkNode.peerId), y);
        //   }),
        // );
  
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