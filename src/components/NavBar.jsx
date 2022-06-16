import React from 'react'
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
            <Image src="images/Black_pizza-logo.jpg" alt="Logo Pizza Delicious" style={{width:'20%'}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/panier">
                <Nav.Link>Panier</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavBar