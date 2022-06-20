import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from '../components/Product'
import { LinkContainer } from 'react-router-bootstrap';

const Cart = () => {
  
  const[stateBidon, setBidon] = useState(0)
  const[cart, setCart] = useState([]);
  const[total, setTotal] = useState(null);




  const handleClick = (newLocalCart) => {

    setCart(newLocalCart)
    setBidon(stateBidon + 1)
    
  };

  useEffect(() => {
    let actualCart = JSON.parse(localStorage.getItem('cart'))
    setCart(actualCart)

}, [])


  return (
    <>

    <Container style={{marginTop : '50px'}}>
        <h1>Cart</h1>
        <Row>
          { cart.map ( product => (
              <Col md={12} className="mt-2">
                  <Product handleClick={handleClick} product={product} bidon={stateBidon}/>
              </Col>
          ))}
        </Row>
        <Row>
          <h3 className='fw-bold'>Total à payer : {total} €</h3>
        </Row>
        <Row>
          <LinkContainer to="/order">
            <Button className='bg-primary text-light mt-3' >Order</Button>
          </LinkContainer>
        </Row>
    </Container>

    </>
  )
}

export default Cart