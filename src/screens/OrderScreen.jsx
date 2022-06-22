import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Payment from '../components/Payment';
import useAuth from "../context/useAuth";

const OrderScreen = () => {


    const { auth, setAuth } = useAuth();
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
            <Row style={{marginTop : '30px'}}>
                <Col md={6}>

                    <h4>Récapitulatif de la commande</h4>
                    <Table striped bordered hover className='text-center' >
                        <thead>
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
                    <p>
                        {auth?.firstname+' '+auth?.lastname}<br/>
                        {auth?.address?.street}<br/>
                    {auth?.address?.zip+' '+auth?.address?.city}<br/>
                    Tél : {auth?.phone}
                    </p>
                </Col>

            </Row>
            <Row>
                <Col md={6} className="paypal">
                    <h4>Paiement</h4>
                    {total ? <Payment total={total} cart={cart}/> : ''}
                </Col>

            </Row>

        </Container>
    
    
    </>
  )
}

export default OrderScreen