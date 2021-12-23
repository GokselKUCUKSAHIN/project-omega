import {mongoDbDriverFactory} from "../mongo-driver/mongo-driver";

async function main(): Promise<void> {
    const driver = await mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017");
    const collection = driver.db("epatch").get("results");
    console.log(await collection.find({}).toArray());
}

main();