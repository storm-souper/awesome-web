import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../action/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodsScreen() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 stay3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input 
              type="radio" 
              id="paypal" 
              value="PayPal" 
              name="paymentMothod"
              required
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input 
              type="radio" 
              id="stripe" 
              value="Stripe" 
              name="paymentMothod"
              required
              onChange={e => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}
