import axios from "axios";
import React from "react";
import { useState } from "react";
import {
    Container,
    Form,
    Button,
    Alert,
    Row,
    Col,
    FloatingLabel,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

const Signin = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            console.log("PAS BON");
        }

        try {
            let response = await axios.post(
                "http://localhost:8080/users/add",
                {
                    email: email,
                    phone: phone,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    address: {
                        street: street,
                        city: city,
                        zip: zip,
                    },
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
                <h1>INSCRIPTION</h1>

                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <h5>Informations personnelles</h5>

                    <Row>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="roger"
                                    value="salut@salut.fr"
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Téléphone"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="0235789861"
                                    value="0235789465"
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Prénom"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="Roger"
                                    value="Roger"
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nom"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="Martin"
                                    value="Martin"
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <h5>Mot de passe</h5>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="formGridPassword"
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Mot de passe"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value="123456"
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="formGridPassword"
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Confirmation mot de passe"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value="123456"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <h5>Adresse</h5>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Numéro et nom de rue"
                        >
                            {" "}
                            <Form.Control
                                placeholder="text"
                                value="56 rue Jambon"
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Ville"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    placeholder="text"
                                    value="Rouen"
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Code postal"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    placeholder="text"
                                    value="76000"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    <Button
                        variant="primary"
                        type="submit"
                        className="align-self-end"
                    >
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

export default Signin;
