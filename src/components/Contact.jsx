
import { Container, Row, Col, Table } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { ImMobile } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
  return (
    <>
        <Container style={{marginTop : '50px'}}>
            <Row>
                <Col md={6}>
                    <h1>Pizza Delicious</h1>
                    <h2>Notre adresse :</h2>
                    <p>103, Rue des Olives noires</p>
                    <p>75021 Paris</p>
                    <p>POUR VOTRE INFORMATION ! Nous offrons un service traiteur complet pour tout évênement, grand ou petit. Nous comprenons vos besoins et nous préparerons nos plats pour satisfaire les critères les plus importants, à la fois esthétique et gustatifs.</p>
                    
                    <Table striped bordered hover className='text-center' >
                        <thead className='bg-warning'>
                            <tr>
                            <th colSpan={3}>-- Nos Coordonées --</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td><FiPhoneCall/></td>
                            <td>Téléphone</td>
                            <td>01 23 45 67 89</td>
                            </tr>
                            <tr>
                            <td><ImMobile/></td>
                            <td>Portable</td>
                            <td>01 98 76 54 32</td>
                            </tr>
                            <tr>
                            <td><AiOutlineMail/></td>
                            <td >Email</td>
                            <td>contact@pizza-delicious.com</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <img className='h-100 w-100' src="./images/farmhouse.jpg" alt="" style={{objectFit: 'cover'}} />
                </Col>

            </Row>

        </Container>
    </>
  )
}

export default Contact