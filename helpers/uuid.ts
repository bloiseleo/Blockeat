export default function uuid() {
    return Math.floor(Math.random() * Date.now()).toString(36);
}