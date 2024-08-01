import { GCounter, GSet, PNCounter } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";

export interface IPlayer extends TopologyObject {
    position: PNCounter;
    merge(peerPlayer: Player): void;

    moveright(nodeId:string): void;
    moveleft(nodeId:string): void;
}

export class Player extends TopologyObject implements IPlayer {
    position: PNCounter;  
    constructor(peerId: string){
        super(peerId);
        this.position = new PNCounter(new GCounter({}), new GCounter({}));
    }

    merge(peerPlayer: Player): void {
        this.position.merge(peerPlayer.position);
    }
    moveright(nodeId:string): void {
        this.position.increment(nodeId, 1);
    }
    moveleft(nodeId: string): void {
        this.position.decrement(nodeId,1);
    }

}