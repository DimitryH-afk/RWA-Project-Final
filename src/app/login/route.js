import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in the login api");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');

    console.log(email);
    console.log(pass);

    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = 'app';
    await client.connect();
    console.log('Connected successfully to server (login)');
    const db = client.db(dbName);
    const collection = db.collection('login');

    const findResult = await collection.find({ "username": email }).toArray();
    console.log('Found documents =>', findResult);

    let result = "invalid";

    if (findResult.length > 0) {
        const bcrypt = require('bcrypt');
        let hashResult = bcrypt.compareSync(pass, findResult[0].pass);
        console.log("checking " + findResult[0].pass);
        console.log("Hash Comparison Result " + hashResult);

        if (hashResult === true) {
            result = "valid";
        }
    }

    return Response.json({ "data": result });
}
