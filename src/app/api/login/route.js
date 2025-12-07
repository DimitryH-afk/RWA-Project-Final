import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function GET(req, res) {

    console.log("in the real login API");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const pass = searchParams.get("pass");

    console.log("API got email:", email);
    console.log("API got pass:", pass);

    // connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db("app");

    const collection = db.collection("login");

    // find user by email
    const user = await collection.findOne({ username: email });

    if (!user) {
        console.log("user not found");
        return Response.json({ data: "invalid" });
    }

    // compare passwords
    const match = bcrypt.compareSync(pass, user.pass);

    if (!match) {
        console.log("password mismatch");
        return Response.json({ data: "invalid" });
    }

    console.log("password valid!");

    return Response.json({
        data: "valid",
        username: user.username,
        acctype: user.acctype
    });
}
