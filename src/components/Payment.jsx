import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom"

function Payment(props) {
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
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
    const onApprove = (data, actions) => {
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

export default Payment