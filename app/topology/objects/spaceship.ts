import { GCounter, GSet, PNCounter } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";
// import SpaceShip from "@/components/spaceship";

export interface ISpaceShip extends TopologyObject {
    alive: GCounter; // if even => alive, else dead
    position: [PNCounter, PNCounter]; //position[1] is for y coordinate and [0] for x
    merge(peerSpaceShip: SpaceShip): void;

    die(nodeId:string, alive: GCounter): void;
    moveright(nodeId:string): void;
    moveleft(nodeId:string): void;

}

export class SpaceShip extends TopologyObject implements ISpaceShip {
    alive: GCounter;
    position: [PNCounter, PNCounter];
    constructor(peerId: string){
        super(peerId);
        this.alive = new GCounter({1});
        this.position = [new PNCounter(new GCounter({}), new GCounter({})), new PNCounter(new GCounter({}), new GCounter({}))];
    }   
    merge(peerSpaceShip: SpaceShip): void {
        this.alive.merge(peerSpaceShip.alive);
        this.position[0].merge(peerSpaceShip.position[0]);
        this.position[1].merge(peerSpaceShip.position[1]);
    }
    die(nodeId:string, alive: GCounter): void{
        alive.increment(nodeId, 1);
    }
    moveright(nodeId:string): void {
        this.position[0].increment(nodeId, 1);
    }
    moveleft(nodeId: string): void {
        this.position[0].decrement(nodeId,1);
    }
}
