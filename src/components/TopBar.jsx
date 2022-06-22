import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdLocalOffer } from "react-icons/md";

const TopBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <h6 className="text-light">
                    <MdLocalOffer className="text-warning" />
                    Livraison gratuite à domicile pour toute commande supérieure
                    à 50€
                </h6>
                <Nav className="ms-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Accueil</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="about">
                        <Nav.Link>A propos</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="Policy">
                        <Nav.Link>Politique de confidentialité</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopBar;
