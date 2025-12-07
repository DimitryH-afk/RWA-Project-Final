import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in submitOrder API");

    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db("app");

    const username = "sample@test.com";

    // fetch items in cart
    const cartItems = await db.collection("shopping_cart")
        .find({ username: username })
        .toArray();

    if (cartItems.length === 0) {
        return Response.json({ data: "empty" });
    }

    // fetch product info to get prices
    const products = await db.collection("products").find({}).toArray();

    let items = [];
    let total = 0;

    cartItems.forEach((c) => {
        const p = products.find((prod) => prod.pname === c.pname);
        if (p) {
            items.push({ pname: p.pname, price: p.price });
            total += Number(p.price);
        }
    });

    const order = {
        username: username,
        items: items,
        total: total,
        date: new Date().toISOString()
    };

    await db.collection("orders").insertOne(order);

    await db.collection("shopping_cart")
        .deleteMany({ username: username });

    return Response.json({ data: "success" });
}
