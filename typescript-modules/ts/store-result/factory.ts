import {SaveToFile} from "./save-to-file";

export class Factory<T> {
    saveToFile(result: T) {
        return new SaveToFile<T>().save;
    }
}