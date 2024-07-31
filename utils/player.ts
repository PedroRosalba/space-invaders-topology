
// // // Player-related classes and functions
// // // -----------------------------------

// // /**
// //  * Represents the player's current position, rotation, and state.
// //  */
// // export class PlayerData {
// //     id: PlayerID;
// //     position: {x: number, y: number};
// //     direction: Direction;
    
// //   constructor() {
// //     this.id = "";
// //     this.position = new Vector3(0, 10000, 20005);
// //     this.rotation = new Euler(0, 0, 0, "XYZ");
// //     this.state = "idle";
// //   }

// //   updatePosition(position?: Vector3, rotation?: Euler, state?: "idle" | "running" | "walking" | "jumping") {
// //     this.position = position ?? this.position;
// //     this.rotation = rotation ?? this.rotation;
// //     this.state = state ?? this.state;
// //   }
// // }

// import { PlayerData } from "./playersData";
// export const player = new PlayerData();

// // Player state data
// // --------------------
// export interface Coords {
//   x: number;
//   y: number;
// }

// export class GameState {
//   mousePosition: Coords;
//   isMouseDown: boolean;
//   isIntersect: boolean;
//   paintMode: boolean;
//   debugMode: boolean;
//   canPaint: boolean;

//   constructor() {
//     this.mousePosition = { x: 0, y: 0 };
//     this.isMouseDown = false;
//     this.isIntersect = false;
//     this.paintMode = false;
//     this.debugMode = false;
//     this.canPaint = false;
//   }

//   setMousePosition(x: number, y: number) {
//     this.mousePosition = { x, y };
//   }

//   setMouseDown(value: boolean) {
//     this.isMouseDown = value;
//   }

//   setIntersect(value: boolean) {
//     this.isIntersect = value;
//   }

//   setPaintMode(value: boolean) {
//     this.paintMode = value;
//   }

//   setDebugMode(value: boolean) {
//     this.debugMode = value;
//   }

//   setCanPaint(value: boolean) {
//     this.canPaint = value;
//   }
// }

// export const gameState = new GameState();

// /**
//  * Selected colors and available colors
//  */
// // export type Color = { r: number; g: number; b: number; a: number };

// // export class PaintSettings {
// //   selectedColor: Color;
// //   palette: Color[];
// //   sprayWheel: boolean;
// //   selectedSpray: number;
// //   sprayStore: SprayData[];

// //   constructor() {
// //     this.selectedColor = { r: 255, g: 0, b: 0, a: 255 };
// //     this.palette = [
// //       { r: 255, g: 0, b: 0, a: 255 },    // Red
// //       { r: 0, g: 255, b: 0, a: 255 },    // Green
// //       { r: 0, g: 0, b: 255, a: 255 },    // Blue
// //       { r: 255, g: 255, b: 0, a: 255 },  // Yellow
// //       { r: 255, g: 0, b: 255, a: 255 },  // Magenta
// //       { r: 0, g: 255, b: 255, a: 255 },  // Cyan
// //       { r: 128, g: 128, b: 128, a: 255 },// Gray
// //       { r: 0, g: 0, b: 0, a: 255 },      // Black
// //       { r: 255, g: 165, b: 0, a: 255 },  // Orange
// //       { r: 75, g: 0, b: 130, a: 255 },   // Indigo
// //     ];
// //     this.sprayWheel = false;
// //     this.selectedSpray = 0;
// //     this.sprayStore = [];
// //   }

// //   setSelectedColor(color: Color) {
// //     this.selectedColor = color;
// //   }

// //   setSprayWheel(value: boolean) {
// //     this.sprayWheel = value;
// //   }

// //   setSelectedSpray(value: number) {
// //     this.selectedSpray = value;
// //   }

// //   addSprayData(spray: SprayData) {
// //     this.sprayStore.push(spray);
// //     this.sprayStore.sort((a, b) => a.timestamp - b.timestamp);
// //   }
// // }

// // export const paintSettings = new PaintSettings();

// // export type SprayData = {
// //   id: number;
// //   offset: { x: number; y: number };
// //   timestamp: number;
// // };
