import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckoutUI from "./CheckoutUI";

export default function Page() {
    const cookie = cookies().get("session");
    if (!cookie) redirect("/");

    const session = JSON.parse(cookie.value);

    if (session.acctype !== "customer") {
        redirect("/");
    }

    return <CheckoutUI />;
}
