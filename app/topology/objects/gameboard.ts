import { GSet, PNCounter, TwoPSet } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";
// import SpaceShip from "@/components/spaceship";

import { Player } from "./player";
import { SpaceShip } from "./spaceship";
import { Bullet } from "./bullet";

export interface IGameBoard extends TopologyObject {
    players: TwoPSet<Player>;
    spaceships: TwoPSet<SpaceShip>;
    bullets: TwoPSet<Bullet>;
    merge(peerGame: GameBoard): void;

    shoot(nodeId:string,position:[PNCounter, PNCounter]): void;
}

export class GameBoard extends TopologyObject implements IGameBoard {
    players: TwoPSet<Player>;
    spaceships: TwoPSet<SpaceShip>;
    bullets: TwoPSet<Bullet>;    
    constructor(peerId:string){
        super(peerId);
        this.players = new TwoPSet(new GSet(new Set<Player>), new GSet(new Set<Player>));
        this.spaceships = new TwoPSet(new GSet(new Set<SpaceShip>), new GSet(new Set<SpaceShip>));
        this.bullets = new TwoPSet(new GSet(new Set<Bullet>), new GSet(new Set<Bullet>));
    }
    merge(peerGame: GameBoard): void{
        this.players.merge(peerGame.players);
        this.spaceships.merge(peerGame.spaceships);
        this.bullets.merge(peerGame.bullets);
    }

    shoot(nodeId:string, position:[PNCounter, PNCounter]): void{
        this.bullets.add(new Bullet(nodeId, position));
    }
}