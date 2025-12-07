import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in the putInCart api page");

    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname');

    console.log(pname);

    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = 'app';
    await client.connect();
    console.log('Connected successfully to server (putInCart)');

    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // collection name

    // for now, hard-coded username (same idea as lab guide)
    const myobj = { pname: pname, username: "sample@test.com" };

    const insertResult = await collection.insertOne(myobj);
    console.log("inserted cart item id:", insertResult.insertedId);

    return Response.json({ "data": "inserted" });
}
