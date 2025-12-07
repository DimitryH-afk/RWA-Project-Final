import { MongoClient } from "mongodb";

export async function GET(req, res) {

    console.log("in the register api");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    const dob = searchParams.get('dob');

    console.log(email);
    console.log(pass);
    console.log(dob);

    // connect to MongoDB using URL from .env.local
    const client = new MongoClient(process.env.MONGO_URL);
    const dbName = 'app';
    await client.connect();
    console.log('Connected successfully to server (register)');
    const db = client.db(dbName);
    const collection = db.collection('login');

    // bcrypt hashing
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(pass, saltRounds);

    const result = await collection.insertOne({
        "username": email,
        "pass": hash,
        "dob": dob,
        "acctype": "customer"
    });

    console.log("Inserted user with id:", result.insertedId);

    return Response.json({ "data": "ok" });
}
