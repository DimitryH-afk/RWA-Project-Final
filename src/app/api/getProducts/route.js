import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in the getProducts api");

    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = "app";   // same DB name as before

    await client.connect();
    console.log("Connected successfully to server (getProducts)");

    const db = client.db(dbName);
    const collection = db.collection("products");

    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

    return Response.json(findResult);
}
