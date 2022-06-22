import axios from "axios";
import React from "react";
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

const Login = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(
                "http://localhost:8080/users/connect",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.code === 404) {
                setError(true);
                setErrorMsg("Les informations ne sont pas valides");
            } else {
                // console.log('CONNECTED');
                // sessionStorage.setItem('logged_user', JSON.stringify(response.data.data))
                // console.log( sessionStorage.getItem('logged_user'));
                state
                    ? navigate("/Order", { replace: true })
                    : navigate("/", { replace: true });

                setAuth(response.data.data);
                console.log(response.data.data);
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <>
            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                <h1>CONNEXION</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>
                {error ? (
                    <Alert variant="danger" style={{ marginTop: "20px" }}>
                        {errorMsg}
                    </Alert>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};

export default Login;
