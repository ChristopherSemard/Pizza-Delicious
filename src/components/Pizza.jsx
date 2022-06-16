import React, {useState} from 'react'
import { Card, Button, Row, Col, Modal } from "react-bootstrap";


const Pizza = (props) => {
    const[taille, setTaille] = useState('small');
    const[quantite, setQuantite] = useState(1);
    const[show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
    <Card className="mt-5" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.lapizza.image} />
        <Card.Body>
            <Card.Title>{props.lapizza.name}</Card.Title>
            <Card.Text>
            <Row>
                <Col md={6}>
                    <h6>Taille</h6>
                    <select value={taille} onChange={(e) => setTaille(e.target.value)}>
                        {props.lapizza.varients.map(taille => (
                            <option value={taille}>{taille}</option>
                        ))}
                    </select>
                </Col>
                <Col md={6}>
                    <h6>Quantité</h6>
                    <select value={quantite} onChange={(e) => setQuantite(e.target.value)}>
                        {[ ...Array(10).keys()].map((v,i) => (
                            <option value={i+1}>{i+1}</option>
                        ))}
                    </select>
                </Col>
            </Row>
            </Card.Text>
            
            <Row>
                <Col md={6}>
                    Prix : {props.lapizza.prices[0][taille] * quantite} €
                </Col>
                <Col md={6}>
                    <Button className='bg-warning text-light'>Add</Button>
                </Col>
            </Row>
            <Row>
                    <Button className='bg-primary text-light mt-3' onClick={handleShow}>See more</Button>
            </Row>
        </Card.Body>
    </Card>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='h-100 w-100' src={props.lapizza.image} alt="" />
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
  )
}

export default Pizza