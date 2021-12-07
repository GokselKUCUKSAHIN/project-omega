import {SaveToFile} from "./save-to-file";

export abstract class SaveResult<ResultTemplete> {
    abstract save(result: ResultTemplete): void;
}