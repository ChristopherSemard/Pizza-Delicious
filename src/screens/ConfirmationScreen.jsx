import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const ConfirmationScreen = () => {
    const { state } = useLocation();

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify([]));
    }, []);

    return (
        <>
            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                <h1>Merci pour votre commande !</h1>
                <p>
                    Montant payé : {state.amountPayed} € (Paypal)
                    <br />
                    Date : {state.date}
                    <br />
                    Identifiant de la commande : {state._id}
                </p>
                <h4>Informations personnelles</h4>
                <p>
                    {state.buyer.firstname + " " + state.buyer.lastname}
                    <br />
                    {state.buyer.address?.street}
                    <br />
                    {state.buyer.address?.zip + " " + state.buyer.address?.city}
                    <br />
                    Tél : {state.buyer.phone}
                    <br />
                    Email : {state.buyer.email}
                </p>

                <h4>Récapitulatif des produits</h4>

                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th colSpan={1}>NOM</th>
                            <th colSpan={1}>QUANTITE</th>
                            <th colSpan={1}>PRIX UNITAIRE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.cart.map((pizza, i) => (
                            <tr md={4} key={i}>
                                <td>{pizza.name}</td>
                                <td>x{pizza.quantity}</td>
                                <td>{pizza.prix} €</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h1 className="text-center">A bientot !</h1>
            </Container>
        </>
    );
};

export default ConfirmationScreen;
