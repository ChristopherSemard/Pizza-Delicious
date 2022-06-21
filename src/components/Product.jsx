import React, {useState, useEffect} from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { BsFillTrashFill } from "react-icons/bs";
import axios from 'axios';

function Product(props) {
    // console.log(props.product);

    
    const[infosPizza, setInfosPizza] = useState([]);
    const[quantity, setQuantity] = useState(props.product.quantity);

  
    const updateProduct = (selectedQuantity) => {
        setQuantity(parseInt(selectedQuantity))
        let actualCart = JSON.parse(localStorage.getItem('cart'))
        const alreadyIn = actualCart.find(
            product => product.name === props.product.name && product.varient === props.product.varient
        );
        alreadyIn.quantity = parseInt(selectedQuantity)
        localStorage.setItem("cart", JSON.stringify(actualCart));
        props.trigger()
    }

    
const deleteProduct = (event) => {
    let target = event.target
    if (target.childNodes.length == 0){
      target = event.target.parentNode
    }
    let actualCart = JSON.parse(localStorage.getItem('cart'))
    const productToDelete = actualCart.find(
        product => product.name === target.dataset.pizza && product.varient === target.dataset.varient
    );
    console.log(productToDelete);        
    const newCart = actualCart.filter(
        product => product !== productToDelete
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    let newLocalCart = JSON.parse(localStorage.getItem('cart'))
  
    props.handleClick(newLocalCart)
  };

    useEffect(() => {
        const getPizza = async () => {
            const getPizzaData = await axios('http://localhost:8080/pizzas/'+props.product.name)
            setInfosPizza(getPizzaData.data)
        }
        getPizza()

    }, [props])
    

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
                <Form.Select aria-label="Default select example" value={quantity} onChange={(e) => updateProduct(e.target.value)}>
                    {[ ...Array(10).keys()].map((v,i) => (
                        <option  key={i} value={i+1}>{i+1}</option>
                    ))}
                </Form.Select>
                    <Button variant="danger" data-pizza={props.product.name} data-varient={props.product.varient} onClick={event => deleteProduct(event)}><BsFillTrashFill data-pizza={props.product.name} data-varient={props.product.varient} /></Button>

                <Card.Text>
                    {infosPizza.prices ? infosPizza.prices[0][props.product.varient] * quantity+ " €" : '' }
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product