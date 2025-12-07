'use client';

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function ManagerGraphPage() {

    const [orders, setOrders] = useState(null);

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

        if (!session || session.acctype !== "manager") {
            window.location.href = "/";
        }
    }, []);

    // fetch orders
    useEffect(() => {
        fetch("/api/getOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    useEffect(() => {
        if (!orders || orders.length === 0) return;

        const counts = {};
        orders.forEach((o) => {
            const d = new Date(o.date);
            const key = d.toISOString().substring(0, 10); // YYYY-MM-DD
            if (!counts[key]) {
                counts[key] = 1;
            } else {
                counts[key] = counts[key] + 1;
            }
        });

        const labels = Object.keys(counts).sort();
        const values = labels.map((k) => counts[k]);

        if (labels.length === 0) return;

        function drawChart() {
            const canvas = document.getElementById("ordersChart");
            if (!canvas) return;

            const ctx = canvas.getContext("2d");

            // create the line chart
            window.ordersChart = new window.Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Orders per day",
                            data: values,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.1)",
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }

        if (window.Chart) {
            drawChart();
        } else {
            // load Chart.js from CDN
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            script.onload = () => {
                drawChart();
            };
            document.head.appendChild(script);
        }
    }, [orders]);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <div style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Orders over Time (Line Graph)
                </div>

                {(!orders || orders.length === 0) && (
                    <div style={{ marginBottom: "20px" }}>
                        No orders yet to display.
                    </div>
                )}

                <canvas
                    id="ordersChart"
                    width={600}
                    height={300}
                    style={{
                        width: "100%",
                        border: "1px solid #ccc",
                        backgroundColor: "#fafafa"
                    }}
                />
            </Box>
        </Container>
    );
}
