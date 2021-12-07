import {EpatchInterface, Status} from "../s11-interface/epatch-interface";

const epatchAPIRequest: EpatchInterface = {
    vmid: "vm1",
    result: {
        status: Status.SUCCESS,
        params: {
            W: 1,
            L: 2,
            Ls: 3,
            Lm: 4,
            Ws: 5,
            p: 6
        },
        s11: [
            [1, 2],
            [15, 2],
            [11, 2],
            [13, 2],
            [6, 2],
            [1, 5],
        ],
        fitness: 123
    },
    algorithm: {
        name: "EPO",
        config: {
            cpu: "M1",
            ram: "8GB",
            gpu: "8-CORE"
        }
    }
}

const strJSON = '{"vmid":"VM42","result":{"status":"SUCCESSFUL","params":{"W":1.000,"L":2.000,"Ls":3.000,"Lm":4.000,"Ws":5.000,"p":6.000},"s11":[[1.3000000000000,2.4000000000000],[3.5000000000000,4.6000000000000],[5.7000000000000,6.8000000000000],[7.9000000000000,8.1000000000000],[9.1100000000000,10.1200000000000],[11.1300000000000,12.1400000000000],[13.1500000000000,14.1600000000000]],"fitness":420.0000000},"algorithm":{"name":"Emperor Penguin Optimizer (EPO)","config":{"PopulationSize":"100","Seed":"1638786180379","M":"2.0"}}}';

const jsonEpatch: EpatchInterface = JSON.parse(strJSON);
// console.log(jsonEpatch);

const epatchResult: EpatchInterface = {
    vmid: "hello",
    result: {
        status: Status.SUCCESS,
        params: {
            W: 1,
            L: 3,
            p: 3,
            Ws: 50,
            Lm: 40,
            Ls: 40
        },
        s11: [[1,2],[3,4]],
        fitness: 123
    },
    algorithm: {
        name: "EPO",
        config: {
            a: "123",
            b: 65
        }
}};

console.log(epatchResult)