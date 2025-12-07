'use client';

import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Page() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    if (!data) return <p>Loading</p>;

    function putInCart(pname) {
        console.log("putting in cart:", pname);
        fetch("http://localhost:3000/api/cart?pname=" + encodeURIComponent(pname));
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                    Customer Products
                </div>

                {data.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            marginBottom: '25px',
                            borderBottom: '1px solid #ccc',
                            paddingBottom: '15px'
                        }}
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.pname}
                                style={{
                                    width: '100%',
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                    marginBottom: '10px'
                                }}
                            />
                        )}

                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            {item.pname}
                        </div>

                        <div style={{ marginBottom: '5px' }}>
                            €{item.price}
                        </div>

                        {item.description && (
                            <div style={{ color: '#666', marginBottom: '10px' }}>
                                {item.description}
                            </div>
                        )}

                        <Button
                            variant="outlined"
                            onClick={() => putInCart(item.pname)}
                        >
                            Add to cart
                        </Button>
                    </div>
                ))}
            </Box>
        </Container>
    );
}
