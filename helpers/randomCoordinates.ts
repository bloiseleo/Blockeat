import Coordinates from "@/entity/Coordinates";

export default function randomCoordinates(x: number, y: number): Coordinates {
    const randomX = Math.floor(Math.random() * (x + 1));
    const randomY = Math.floor(Math.random() * (y + 1));
  
    return { x: randomX, y: randomY };
  }