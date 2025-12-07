'use client';

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function ManagerUI() {

    const [orders, setOrders] = useState(null);

    // MANAGER-ONLY session check
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

        // if not logged in OR wrong role → go back to login
        if (!session || session.acctype !== "manager") {
            window.location.href = "/";
        }
    }, []);

    // fetch all orders
    useEffect(() => {
        fetch("/api/getOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    if (!orders) return <p>Loading orders...</p>;

    // simple stats
    let revenue = 0;
    orders.forEach((o) => {
        revenue += Number(o.total);
    });

    let orderCount = orders.length;

    let counts = {};
    orders.forEach((o) => {
        o.items.forEach((i) => {
            if (!counts[i.pname]) {
                counts[i.pname] = 1;
            } else {
                counts[i.pname] = counts[i.pname] + 1;
            }
        });
    });

    let mostPopular = "None";
    let maxCount = 0;

    Object.keys(counts).forEach((name) => {
        if (counts[name] > maxCount) {
            maxCount = counts[name];
            mostPopular = name;
        }
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>

                <div style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Manager Dashboard
                </div>

                {/* summary stats */}
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px"
                    }}
                >
                    <div><b>Total Revenue:</b> €{revenue}</div>
                    <div><b>Total Orders:</b> {orderCount}</div>
                    <div><b>Most Popular Item:</b> {mostPopular}</div>
                </div>

                {/* link to graph page */}
                <div style={{ marginBottom: "20px" }}>
                    <a href="/manager/graph">Graph data</a>
                </div>

                {/* orders list */}
                {orders.map((order) => (
                    <div
                        key={order._id}
                        style={{
                            borderBottom: "1px solid #ccc",
                            marginBottom: "15px",
                            paddingBottom: "10px"
                        }}
                    >

                        <div style={{ fontWeight: "bold" }}>
                            Order by: {order.username}
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            Date: {new Date(order.date).toLocaleString()}
                        </div>

                        {order.items.map((item, i) => (
                            <div key={i}>
                                {item.pname} — €{item.price}
                            </div>
                        ))}

                        <div style={{ marginTop: "8px", fontWeight: "bold" }}>
                            Total: €{order.total}
                        </div>

                    </div>
                ))}

            </Box>
        </Container>
    );
}
