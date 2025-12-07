export async function GET(req, res) {

    console.log("in the api page");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');

    console.log("API got email:", email);
    console.log("API got pass:", pass);

    // database call will go here later

    return Response.json({ "data": "valid" });
}
