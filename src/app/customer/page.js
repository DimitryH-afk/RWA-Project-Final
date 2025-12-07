'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Page() {

    const [data, setData] = useState(null);

    useEffect(() => {
        // get list of products from the API
        fetch('http://localhost:3000/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    if (!data) return <p>Loading</p>;

    // function for putting items into the shopping cart (lab style)
    function putInCart(pname) {
        console.log("putting in cart: " + pname);
        fetch("http://localhost:3000/api/cart?pname=" + encodeURIComponent(pname));
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                    Customer Products
                </Typography>

                <Grid container spacing={2}>
                    {data.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card sx={{ height: '100%' }}>
                                {item.image && (
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={item.image}
                                        alt={item.pname}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {item.pname}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        €{item.price}
                                    </Typography>
                                    {item.description && (
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    )}
                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                        onClick={() => putInCart(item.pname)}
                                    >
                                        Add to cart
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
