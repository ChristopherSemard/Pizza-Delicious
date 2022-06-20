import React from 'react'
import { Container, Row, Col, Table } from "react-bootstrap";

const OrderScreen = () => {
  return (
    <>
    
    <Container style={{marginTop : '50px'}}>
            <Row>
                <Col md={6}>
                    <h1>Votre commande</h1>

                    <Table striped bordered hover className='text-center' >
                        <thead className='bg-warning'>
                            <tr>
                            <th colSpan={3}>-- Nos Coordonées --</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Téléphone</td>
                            <td>01 23 45 67 89</td>
                            </tr>
                            <tr>
                            <td>Portable</td>
                            <td>01 98 76 54 32</td>
                            </tr>
                            <tr>
                            <td >Email</td>
                            <td>contact@pizza-delicious.com</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>

            </Row>

        </Container>
    
    
    </>
  )
}

export default OrderScreen