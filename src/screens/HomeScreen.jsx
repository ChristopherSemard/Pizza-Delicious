import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pizza from "../components/Pizza";
import axios from "axios";

const HomeScreen = () => {
    const [AllPizzas, setAllPizzas] = useState([]);

    useEffect(() => {
        const getPizzas = async () => {
            const getPizzasData = await axios("http://localhost:8080/pizzas");
            setAllPizzas(getPizzasData.data);
        };
        getPizzas();
    }, []);

    return (
        <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
            <Row className="d-flex gap-3  justify-content-center">
                {AllPizzas.map((pizza, i) => (
                    <Col
                        lg={3}
                        md={5}
                        key={i}
                        className="d-flex justify-content-center"
                    >
                        <Pizza lapizza={pizza} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomeScreen;
