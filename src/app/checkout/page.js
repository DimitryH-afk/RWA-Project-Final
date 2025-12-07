'use client';

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function CheckoutUI() {

    const [items, setItems] = useState(null);

    // customer-only session check
    useEffect(() => {
        const all = document.cookie.split(";");
        let session = null;

        all.forEach((p) => {
            p = p.trim();
            if (p.startsWith("session=")) {
                const value = p.substring("session=".length);
                try {
                    session = JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    session = null;
                }
            }
        });

        if (!session || session.acctype !== "customer") {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        fetch("/api/getCart")
            .then((res) => res.json())
            .then((json) => setItems(json));
    }, []);

    if (!items) return <p>Loading checkout...</p>;

    let total = 0;
    items.forEach((i) => total += Number(i.price));
    total = Math.round(total * 100) / 100;

    function confirmOrder() {
        fetch("/api/submitOrder")
            .then((res) => res.json())
            .then((data) => {
                if (data.data === "success") {
                    window.location.href = "/customer";
                }
            });
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>

                <div style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Checkout
                </div>

                {items.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            borderBottom: "1px solid #ccc",
                            marginBottom: "10px",
                            paddingBottom: "10px"
                        }}
                    >
                        <div>{item.pname}</div>
                        <div>€{item.price}</div>
                    </div>
                ))}

                <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                    Total: €{total.toFixed(2)} 

                </div>

                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={confirmOrder}
                >
                    Confirm Order
                </Button>

            </Box>
        </Container>
    );
}
