import React, {useState, useEffect} from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { BsFillTrashFill } from "react-icons/bs";
import axios from 'axios';

const Product = (props) => {

    const[infosPizza, setInfosPizza] = useState([]);
    const[quantite, setQuantite] = useState(0);
  
    const updateProduct = () => {
        let actualCart = JSON.parse(localStorage.getItem('cart'))
        const alreadyIn = actualCart.find(
            product => product.name === props.product.name && product.varient === props.product.varient
        );
        console.log("salut");
    }

    useEffect(() => {
        const getPizza = async () => {
            
            const getPizzaData = await axios('http://localhost:8080/pizzas/'+props.product.name)
            setInfosPizza(getPizzaData.data)
            console.log(getPizzaData.data)
        }
        getPizza()
    }, [])
    

  return (
    <>
        <Card className='flex-row w-100' >
            <Card.Img className='w-25' variant="left" src={infosPizza.image} />
            <Card.Body className='w-50'>
                <Card.Title>{props.product.name +" - "+ props.product.varient }</Card.Title>
                <Card.Text>
                {infosPizza.description}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Form.Select aria-label="Default select example" value={props.product.quantity} onChange={updateProduct}>
                    {[ ...Array(10).keys()].map((v,i) => (
                        <option value={i+1}>{i+1}</option>
                    ))}
                </Form.Select>
                <Button variant="danger"><BsFillTrashFill/></Button>
                <Card.Text>
                    {infosPizza.prices[0][props.product.varient] /** props.product.quantity € */}
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product