'use client';

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function CustomerPage() {

    const [data, setData] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherError, setWeatherError] = useState(null);

    useEffect(() => {
        fetch('/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const city = "Dublin";
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + apiKey;

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                console.log("weather json:", json);

                if (json.cod === 200 && json.main && json.weather && json.weather.length > 0) {
                    setWeather({
                        temp: json.main.temp,
                        desc: json.weather[0].description
                    });
                } else {
                    setWeatherError(json.message || "Weather service error");
                }
            })
            .catch((err) => {
                console.log("weather error", err);
                setWeatherError("Weather service error");
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
                {weather && (
                    <div
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>Current Weather</div>
                        <div>
                            {Math.round(weather.temp)}°C, {weather.desc}
                        </div>
                    </div>
                )}

                {!weather && weatherError && (
                    <div
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <div style={{ fontWeight: 'bold' }}>Current Weather</div>
                        <div>Weather service not available ({weatherError})</div>
                    </div>
                )}

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
