import { number } from "./main";
import init from "three/examples/jsm/offscreen/scene";

export function setLevel(newNumber) {
    number = newNumber;
    init();
}