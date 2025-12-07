'use client';

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Page() {

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
            .then((data) => {
                setItems(data);
            });
    }, []);

    function removeItem(id) {
        fetch("/api/deleteCart?id=" + id)
            .then(() => {
                // refresh cart list
                fetch("/api/getCart")
                    .then((res) => res.json())
                    .then((data) => setItems(data));
            });
    }

    if (!items) return <p>Loading cart...</p>;

    let total = 0;
    items.forEach((i) => total += Number(i.price));

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                    Your Cart
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                        document.cookie = "session=; path=/; max-age=0";
                        window.location.href = "/";
                        }}
                    >
                    Logout
                    </Button>
                </div>
                
                {items.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            borderBottom: '1px solid #ccc',
                            paddingBottom: '10px',
                            marginBottom: '15px'
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>{item.pname}</div>
                        <div>€{item.price}</div>

                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={() => removeItem(item._id)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}

                    <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                       Total: €{total}
                    </div>

                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => window.location.href = "/checkout"}
                    >
                    Go to Checkout
                    </Button>

            </Box>
        </Container>
    );
}
