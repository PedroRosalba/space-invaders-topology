import { GCounter, GSet, PNCounter } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";


export interface IBullet extends TopologyObject {
    alive: GCounter; // if even => alive, else dead
    position: [PNCounter, PNCounter]; //position[1] is for y coordinate and [0] for x
    merge(peerBullet: Bullet): void;

    die(nodeId:string, alive: GCounter): void;
    move(nodeId:string): void;
}

export class Bullet extends TopologyObject implements IBullet {
    alive: GCounter;
    position: [PNCounter, PNCounter];
    constructor(peerId: string, position: [PNCounter, PNCounter]){
        super(peerId);
        this.alive = new GCounter({1});
        this.position = [new PNCounter(new GCounter({}), new GCounter({})), new PNCounter(new GCounter({}), new GCounter({}))];
    }   
    merge(peerBullet: Bullet): void {
        this.alive.merge(peerBullet.alive);
        this.position[0].merge(peerBullet.position[0]);
        this.position[1].merge(peerBullet.position[1]);
    }
    die(nodeId:string, alive: GCounter): void{
        alive.increment(nodeId, 1);
    }
    move(nodeId:string): void {
        this.position[1].decrement(nodeId, 1);
    }
}