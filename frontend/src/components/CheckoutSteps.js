import React from 'react'
import { Link } from 'react-router-dom';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>
        <div>
          <Link 
            className={props.stay1 ? 'active' : ''} 
            to="/signin"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className={props.step2 ? 'active' : ''}>
        <div>
          <Link 
            className={props.stay2 ? 'active' : ''} 
            to="/shipping"
          >
            Shipping
          </Link>
        </div>
      </div>
      <div className={props.step3 ? 'active' : ''}>
        <div>
          <Link 
            className={props.stay3 ? 'active' : ''} 
            to="/payment"
          >
            Payment
          </Link>
        </div>
      </div>
      <div className={props.step4 ? 'active' : ''}>
        <div>
          <Link className={props.stay4 ? 'active' : ''} to="/placeorder">Place Order</Link>
        </div>
      </div>
    </div>
  );
};

