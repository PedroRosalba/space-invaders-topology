import { GSet, PNCounter } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";

export interface IPlayer extends TopologyObject {
    position: PNCounter;
    merge(peerPlayer: IPlayer): void;
}

export class Player extends TopologyObject implements IPlayer {
    position: PNCounter;  
    constructor(peerId: string){
        super(peerId);
        this.position = new PNCounter({},{})
    }

    merge(peerPlayer: Player): void {
        this.position.merge(peerPlayer.position);
    }
}