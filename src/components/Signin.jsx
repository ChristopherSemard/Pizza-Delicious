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
    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState("salut@salut.fr");
    const [phone, setPhone] = useState("0235789654");
    const [firstname, setFirstname] = useState("Roger");
    const [lastname, setLastname] = useState("Martin");
    const [password, setPassword] = useState("123456");
    const [confirmPassword, setConfirmPassword] = useState("123456");
    const [street, setStreet] = useState("25 rue Jambon");
    const [city, setCity] = useState("Rouen");
    const [zip, setZip] = useState("76000");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Test email
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError(true);
            setErrorMsg("Veuillez renseigner un email valide");
            return;
        }
        // Test téléphone
        else if (!/^[0-9]+$/.test(phone)) {
            setError(true);
            setErrorMsg("Veuillez renseigner un téléphone valide");
            return;
        }
        // Test prénom
        else if (firstname.length < 1) {
            setError(true);
            setErrorMsg("Veuillez renseigner un prénom valide");
            return;
        }
        // Test nom
        else if (lastname.length < 1) {
            setError(true);
            setErrorMsg("Veuillez renseigner un nom valide");
            return;
        }
        // Test regex mot de passe
        else if (!/^[0-9]+$/.test(password)) {
            setError(true);
            setErrorMsg(
                "Le mot de passe ne remplit pas toutes les critères nécessaires"
            );
            return;
        }
        // Test confirmation mot de passe
        else if (password != confirmPassword) {
            setError(true);
            setErrorMsg("Les mots de passe ne correspondent pas");
            return;
        }
        // Test rue
        else if (street.length < 1) {
            setError(true);
            setErrorMsg("Veuillez renseigner un numéro et nom de rue valide");
            return;
        }
        // Test ville
        else if (city.length < 1) {
            setError(true);
            setErrorMsg("Veuillez renseigner une ville valide");
            return;
        }
        // Test ville
        else if (zip.length < 1) {
            setError(true);
            setErrorMsg("Veuillez renseigner un code postal valide");
            return;
        }

        const getAlreadyExists = await axios(
            "http://localhost:8080/users/" + email
        );
        if (getAlreadyExists.data.code == 200) {
            setError(true);
            setErrorMsg("Cet email possède déjà un compte");
            return;
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
            setAuth(response.data.data);
            navigate("/", { replace: true });
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
                                controlId="floatingInputEmail"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="roger"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInputPhone"
                                label="Téléphone"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="0235789861"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInputFName"
                                label="Prénom"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="Roger"
                                    value={firstname}
                                    onChange={(e) =>
                                        setFirstname(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel
                                controlId="floatingInputLName"
                                label="Nom"
                                className="mb-3"
                            >
                                <Form.Control
                                    placeholder="Martin"
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
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
                                controlId="floatingInputPassword"
                                label="Mot de passe"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="formGridPassword"
                        >
                            <FloatingLabel
                                controlId="floatingInputCPassword"
                                label="Confirmation mot de passe"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <h5>Adresse</h5>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <FloatingLabel
                            controlId="floatingInputStreet"
                            label="Numéro et nom de rue"
                        >
                            {" "}
                            <Form.Control
                                placeholder="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <FloatingLabel
                                controlId="floatingInputCity"
                                label="Ville"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    placeholder="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <FloatingLabel
                                controlId="floatingInputZip"
                                label="Code postal"
                                className="mb-3"
                            >
                                {" "}
                                <Form.Control
                                    placeholder="text"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        {error ? (
                            <Alert
                                variant="danger"
                                style={{ marginTop: "20px" }}
                            >
                                {errorMsg}
                            </Alert>
                        ) : (
                            ""
                        )}
                        <Button
                            variant="primary"
                            type="submit"
                            className="align-self-end"
                        >
                            Valider
                        </Button>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default Signin;
