export interface EpatchInterface {
    vmid: string;
    result: EPatchResult;
    algorithm: OatAlgorithm;
}
export interface EPatchResult {
    status: Status;
    params: EPatchParams;
    s11: number[][];
    fitness: number;
}
export declare enum Status {
    FAIL = "FAIL",
    SUCCESS = "SUCCESS"
}
export interface EPatchParams {
    W: number;
    L: number;
    Ls: number;
    Lm: number;
    Ws: number;
    p: number;
}
export interface OatAlgorithm {
    name: string;
    config: OatConfig;
}
export interface OatConfig {
    [key: string]: string;
}
