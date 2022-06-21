import React from "react";
import ReactDOM from "react-dom"

function Payment() {
    
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "0.01",
            },
          },
        ],
      });
    };
    const onApprove = (data, actions) => {
      return actions.order.capture();
    };
    return (
        <>
        {console.log('salut')}
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
      </>
    );
  }

export default Payment