import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";

const Pizza = (props) => {
    const [taille, setTaille] = useState("small");
    const [quantite, setQuantite] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const addCart = () => {
        let actualCart = JSON.parse(localStorage.getItem("cart"));
        const alreadyIn = actualCart.find(
            (product) =>
                product.name === props.lapizza.name &&
                product.varient === taille
        );
        if (alreadyIn) {
            let newQuantity = parseInt(quantite) + parseInt(alreadyIn.quantity);
            newQuantity > 10
                ? (alreadyIn.quantity = 10)
                : (alreadyIn.quantity = newQuantity);

            localStorage.setItem("cart", JSON.stringify(actualCart));
        } else {
            let product = {
                name: props.lapizza.name,
                varient: taille,
                quantity: parseInt(quantite),
                _id: props.lapizza._id,
            };
            let newCart = [...actualCart, product];
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };

    useEffect(() => {
        let actualCart = localStorage.getItem("cart");
        if (!actualCart) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }, []);

    return (
        <>
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={props.lapizza.image} />
                <Card.Body>
                    <Card.Title className="mb-3">
                        {props.lapizza.name}
                    </Card.Title>
                    <Row>
                        <Col md={6}>
                            <h6>Taille</h6>
                        </Col>

                        <Col md={6} className="d-flex align-items-center">
                            <Form.Select
                                className="w-100"
                                value={taille}
                                onChange={(e) => setTaille(e.target.value)}
                            >
                                {props.lapizza.varients.map((taille, i) => (
                                    <option key={i} value={taille}>
                                        {taille}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col md={6}>
                            <h6>Quantité</h6>
                        </Col>
                        <Col md={6}>
                            <Form.Select
                                className="w-100"
                                value={quantite}
                                onChange={(e) => setQuantite(e.target.value)}
                            >
                                {[...Array(10).keys()].map((v, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col md={6} className="d-flex align-items-center fs-5">
                            <p className="mb-0">
                                Prix : {props.lapizza.prices[0][taille]} €
                            </p>
                        </Col>
                        <Col md={6}>
                            <Button
                                className="bg-success text-light w-100"
                                onClick={addCart}
                            >
                                Ajouter
                            </Button>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-center">
                        <Button
                            className="bg-primary text-light mt-3 w-50"
                            onClick={handleShow}
                        >
                            Plus d'infos
                        </Button>
                    </Row>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        className="h-100 w-100"
                        src={props.lapizza.image}
                        alt=""
                    />
                    <h3>Description</h3>
                    <p>{props.lapizza.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Pizza;
