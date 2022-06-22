import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Table,
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import axios from "axios";
import Payment from "../components/Payment";
import useAuth from "../context/useAuth";

const OrderScreen = () => {
    const { auth, setAuth } = useAuth();
    const [infosPizzas, setInfosPizzas] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(null);
    const [bidon, setBidon] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [street, setStreet] = useState(null);
    // const [other, setOther] = useState(null);
    const [zip, setZip] = useState(null);
    const [city, setCity] = useState(null);
    const [checked, setChecked] = useState(false);
    const handleForm = async (e) => {
        e.preventDefault();
        setShow(false);
        let newAuth = auth;
        newAuth.address.street = street;
        newAuth.address.zip = zip;
        newAuth.address.city = city;
        console.log(newAuth);
        if (checked) {
            try {
                let response = await axios.post(
                    "http://localhost:8080/users/update",
                    {
                        id: auth._id,
                        street: street,
                        zip: zip,
                        city: city,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data.code === 404) {
                } else {
                }
            } catch (err) {
                console.log(err.response);
            }
        }

        setAuth(newAuth);
        setChecked(false);
    };

    useEffect(() => {
        let actualCart = JSON.parse(localStorage.getItem("cart"));
        setCart(actualCart);
    }, []);

    useEffect(() => {
        const getPizza = async () => {
            const getPizzaData = await axios("http://localhost:8080/pizzas/");
            setInfosPizzas(getPizzaData.data);
            setBidon(bidon + 1);
        };
        getPizza();
    }, []);

    useEffect(() => {
        let actualCart = JSON.parse(localStorage.getItem("cart"));
        let totalAPayer = 0;
        if (infosPizzas.length > 0) {
            let newCart = [];
            for (const product of actualCart) {
                const productDatas = infosPizzas.find(
                    (pizza) => pizza.name === product.name
                );
                totalAPayer +=
                    productDatas.prices[0][product.varient] *
                    parseInt(product.quantity);
                product["prix"] = productDatas.prices[0][product.varient];
                newCart.push(product);
            }
            setCart(newCart);
            setTotal(totalAPayer);
        }
    }, [bidon]);

    useEffect(() => {
        setStreet(auth.address.street);
        setZip(auth.address.zip);
        setCity(auth.address.city);
    }, [auth]);

    return (
        <>
            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                <h1>Votre commande</h1>
                <Row style={{ marginTop: "30px" }}>
                    <Col md={6}>
                        <h4>Récapitulatif de la commande</h4>
                        <Table striped bordered className="text-center">
                            <thead>
                                <tr>
                                    <th colSpan={1}>NOM</th>
                                    <th colSpan={1}>QUANTITE</th>
                                    <th colSpan={1}>PRIX UNITAIRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((pizza, i) => (
                                    <tr md={4} key={i}>
                                        <td>{pizza.name}</td>
                                        <td>{pizza.quantity}</td>
                                        <td>{pizza.prix} €</td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>Total à payer :</td>
                                    <td>{total} €</td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>

                    <Col md={6}>
                        <h4>Adresse de livraison</h4>
                        <p>
                            {auth?.firstname + " " + auth?.lastname}
                            <br />
                            {street}
                            <br />
                            {zip + " " + city}
                            <br />
                            Tél : {auth?.phone}
                        </p>
                        <Button
                            className="bg-primary text-light mt-3 w-50"
                            onClick={handleShow}
                        >
                            Modifier l'adresse
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="paypal">
                        <h4>Paiement</h4>
                        {total ? <Payment total={total} cart={cart} /> : ""}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adresse de livraison</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Rue</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rue"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Code postal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Control"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check
                                type="checkbox"
                                label="Changer l'addresse pour mes prochaines commandes"
                                onChange={(e) => setChecked(e.target.checked)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Valider
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default OrderScreen;
