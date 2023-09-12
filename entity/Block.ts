import randomCoordinates from "@/helpers/randomCoordinates";
import Collidable from "./Collidable";
import Coordinates from "./Coordinates";

export default class Block extends Collidable { 
    static factory(canvasSize: Coordinates) {
        const coordinates = randomCoordinates(canvasSize.x - 16, canvasSize.y - 16);
        return new Block(
            coordinates
        );
    }
}