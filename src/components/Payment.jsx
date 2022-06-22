import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../context/useAuth";

function Payment(props) {
    const { auth, setAuth } = useAuth();
    let navigate = useNavigate();

    const PayPalButton = window.paypal.Buttons.driver("react", {
        React,
        ReactDOM,
    });
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.total,
                    },
                },
            ],
        });
    };
    const onApprove = async (data, actions) => {
        const createOrder = async () => {
            let response = await axios.post(
                "http://localhost:8080/orders/add",
                {
                    paypal: {
                        orderId: data.orderID,
                        payerId: data.payerID,
                    },
                    date: new Date().toLocaleDateString(),
                    buyer: auth,
                    amountPayed: props.total,
                    cart: props.cart,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        };

        let orderInfos = await createOrder();
        navigate("/Confirmation", { state: orderInfos });
        return actions.order.capture();
    };
    return (
        <>
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </>
    );
}

export default Payment;
