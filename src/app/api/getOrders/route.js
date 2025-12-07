import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in getOrders API");

    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db("app");

    const orders = await db.collection("orders")
        .find({})
        .toArray();

    return Response.json(orders);
}
