import { MongoClient, ObjectId } from "mongodb";

export async function GET(req, res) {

    console.log("in deleteCart API");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = "app";

    await client.connect();
    const db = client.db(dbName);

    const result = await db.collection("shopping_cart").deleteOne({
        _id: new ObjectId(id)
    });

    console.log("Deleted:", result.deletedCount);

    return Response.json({ data: "deleted" });
}
