import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in getCart API");

    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = "app";

    await client.connect();
    const db = client.db(dbName);

    const username = "sample@test.com";

    const cartItems = await db.collection("shopping_cart")
        .find({ username: username })
        .toArray();

    const products = await db.collection("products").find({}).toArray();

    const result = cartItems.map((item) => {
        const p = products.find((prod) => prod.pname === item.pname);
        return {
            _id: item._id,
            pname: item.pname,
            price: p ? p.price : 0
        };
    });

    return Response.json(result);
}
