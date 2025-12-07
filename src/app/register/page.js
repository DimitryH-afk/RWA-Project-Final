'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function RegisterPage() {

    const handleSubmit = (event) => {
        console.log("handling register");
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let pass = data.get('pass');
        let dob = data.get('dob');

        //debug
        console.log("Register email:" + email);
        console.log("Register pass:" + pass);
        console.log("Register dob:" + dob);

        runDBCallAsync(
            `http://localhost:3000/api/register?email=${email}&pass=${pass}&dob=${dob}`
        );
    };

    async function runDBCallAsync(url) {
        const res = await fetch(url);
        const data = await res.json();

        if (data.data === "ok") {
            console.log("registration complete");
        } else {
            console.log("registration failed");
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ width: '100%' }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="password"
                        id="pass"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="dob"
                        label="Date of Birth"
                        id="dob"
                        placeholder="2000-01-01"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/" variant="body2">
                            Already have an account? Login here
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
