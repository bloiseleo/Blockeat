class ClientCordinates {
    constructor(private _width: number,private _height: number) {}
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}

export default new ClientCordinates(1200, 800);