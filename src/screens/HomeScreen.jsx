import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Pizza from '../components/Pizza'
import axios from 'axios';

const HomeScreen = () => {

    const [AllPizzas, setAllPizzas] = useState([]);

    useEffect(() => {
        const getPizzas = async () => {
            const getPizzasData = await axios('http://localhost:8080/pizzas')
            setAllPizzas(getPizzasData.data)
        }
        getPizzas()
    }, [])

    return (
        <Container>
            <Row>
                { AllPizzas.map ( pizza => (
                    <Col md={4}>
                        <Pizza lapizza={pizza}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen