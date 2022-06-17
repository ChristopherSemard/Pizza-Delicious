import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Product from '../components/Product'

const Cart = () => {
  
  const[cart, setCart] = useState([]);

  useEffect(() => {
    let actualCart = JSON.parse(localStorage.getItem('cart'))
    setCart(actualCart)
  }, [])

  console.log(cart)
  return (
    <>

    <Container style={{marginTop : '50px'}}>
        <h1>Cart</h1>

        <Row>
                { cart.map ( product => (
                    <Col md={12} className="mt-2">
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
    </Container>

    </>
  )
}

export default Cart