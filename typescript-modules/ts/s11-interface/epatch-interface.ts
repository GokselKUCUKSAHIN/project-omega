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

export enum Status {
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
    [key: string]: string | number;
}

/*
{"vmid":"VM42","result":{"status":"SUCCESSFUL","params":{"W":1.000,"L":2.000,"Ls":3.000,"Lm":4.000,"Ws":5.000,"p":6.000},
"s11":[[1.3000000000000,2.4000000000000],[3.5000000000000,4.6000000000000],[5.7000000000000,6.8000000000000],[7.9000000000000,8.1000000000000],
[9.1100000000000,10.1200000000000],[11.1300000000000,12.1400000000000],[13.1500000000000,14.1600000000000]],"fitness":420.0000000},
"algorithm":{"name":"Emperor Penguin Optimizer (EPO)","config":{"PopulationSize":"100","Seed":"1638786180379","M":"2.0"}}}
 */