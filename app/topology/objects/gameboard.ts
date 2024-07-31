import { GSet, PNCounter, TwoPSet } from "@topology-foundation/crdt";
import { TopologyObject } from "@topology-foundation/object";
// import SpaceShip from "@/components/spaceship";

import { Player } from "./player";
import { SpaceShip } from "./spaceship";
import { Bullet } from "./bullet";

export interface IGameBoard extends TopologyObject {
    players: TwoPSet<Player>
}