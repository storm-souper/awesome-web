import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constant/cartConstant";

export const addToCart = (productID, qty) => async(dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productID}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStocks: data.countInStocks,
      product: data._id,
      seller: data.seller,
      qty: qty
    },
  });
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (productID) => async(dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productID,
  });
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data});
};