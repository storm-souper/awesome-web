import thunk from 'redux-thunk';
import {
  applyMiddleware, 
  combineReducers, 
  compose, 
  createStore 
} from 'redux';
import { 
  productCreateReducer, 
  productDeleteReducer, 
  productDetailsReducer, 
  productListReducer, 
  productUpdateReducer 
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { 
  userDeleteReducer,
  userDetailsReducer, 
  userListReducer, 
  userRegisterReducer, 
  userSigninReducer, 
  userUpdateAdminReducer, 
  userUpdateProfileReducer 
} from './reducers/userReducers';
import { 
  orderCreateReducer, 
  orderDeleteReducer, 
  orderDeliverReducer, 
  orderDetailsReducer, 
  orderListReducer, 
  orderMIneListReducer, 
  orderPayReducer 
} from './reducers/orderReducers';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
  userSignin: {userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,
  },
};
//Where to use productList 
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMIneListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;