import Renderable from "./Renderable";

export default abstract class Collidable extends Renderable {
    isCollidingWith(block: Renderable): boolean {
        return (
            this.x < block.x + block.width &&
            this.x + this.width > block.x &&
            this.y < block.y + block.height &&
            this.y + this.height > block.y
        );
    }
}