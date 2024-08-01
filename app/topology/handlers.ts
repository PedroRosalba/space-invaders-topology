import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { OBJECT_ID, PRESENCE_GROUP } from ".";
import { players, PlayerData } from "../../utils/playersData";
import type { Player, PlayerID } from "../../utils/playersData";
import { addOrUpdatePlayer } from "../../utils/playersManager";
import { type IGameBoard } from "./objects/gameboard";
import { GameBoard } from ",/objects/gameboard";

export function handlePresenceMessages(e: any) {
    if (e.detail.msg.topic !== PRESENCE_GROUP) return;
    const input = uint8ArrayToString(e.detail.msg.data);
    const player: Player = JSON.parse(input);
    addOrUpdatePlayer(player);
}