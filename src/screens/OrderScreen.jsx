import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Payment from '../components/Payment';

const OrderScreen = () => {

    const[infosPizzas, setInfosPizzas] = useState([])
    const[cart, setCart] = useState([]);
    const[total, setTotal] = useState(null);
    const[bidon, setBidon] = useState(0);

    useEffect(() => {
        let actualCart = JSON.parse(localStorage.getItem('cart'))
        setCart(actualCart)
      }, [])


      useEffect(() => {
        const getPizza = async () => {
          const getPizzaData = await axios('http://localhost:8080/pizzas/')
          setInfosPizzas(getPizzaData.data)
          setBidon(bidon + 1)
        }
        getPizza()
      }, [])
    
    
      useEffect(() => {
        let actualCart = JSON.parse(localStorage.getItem('cart'))
        let totalAPayer = 0;
        if(infosPizzas.length > 0){
            let newCart = [];
          for (const product of actualCart) {
            const productDatas = infosPizzas.find(
              pizza => pizza.name === product.name );
              totalAPayer += productDatas.prices[0][product.varient] * parseInt(product.quantity);
              product['prix'] = productDatas.prices[0][product.varient]
              newCart.push(product)
          }
          setCart(newCart)
          setTotal(totalAPayer)
        }
      }, [bidon])
      

  return (
    <>
    <Container style={{marginTop : '50px'}}>
            <h1>Votre commande</h1>
            <Row>
                <Col md={6}>

                    <Table striped bordered hover className='text-center' >
                        <thead>
                            <tr  className='bg-warning'>
                            <th colSpan={3}>-- Récapitulatif --</th>
                            </tr>
                            <tr>
                            <th colSpan={1}>NOM</th>
                            <th colSpan={1}>QUANTITE</th>
                            <th colSpan={1}>PRIX UNITAIRE</th>
                            </tr>
                        </thead>
                        <tbody>   
                            { cart.map ( (pizza, i) => (
                                <tr md={4}  key={i}  >
                                    <td>{pizza.name}</td>
                                    <td>x{pizza.quantity}</td>
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
                    <p>Véronique-Brigitte Roche<br/>
                        37 Rue de Berne<br/>
                    75008 Paris<br/>
                    Tél : 01 43 87 08 92</p>
                </Col>

            </Row>
            <Row>
                <Col className="paypal">
                    <h4>Paiement</h4>
                    {total ? <Payment total={total}/> : ''}
                </Col>

            </Row>

        </Container>
    
    
    </>
  )
}

export default OrderScreen