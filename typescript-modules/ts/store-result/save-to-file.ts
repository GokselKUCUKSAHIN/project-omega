import {SaveResult} from "./save-result";
import * as fs from "fs";

export class SaveToFile<T> extends SaveResult<T> {
    // Immutable by the Nature ;)
    save(result: T): void {
        fs.writeFileSync("hey.txt", "hello, world" + JSON.stringify(result), "utf-8");
    }
}