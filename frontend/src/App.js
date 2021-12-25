import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import { signout } from './action/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import CartScreen from './screen/CartScreen';
import HomeScreen from "./screen/HomeScreen";
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import OrderListScreen from './screen/OrderListScreen';
import OrderScreen from './screen/OrderScreen';
import PaymentMethodsScreen from './screen/PaymentMethodsScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import ProductEditSreen from './screen/ProductEditSreen';
import ProductListScreen from './screen/ProductListScreen';
import ProductScreen from "./screen/ProductScreen";
import ProfileScreen from './screen/ProfileScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import SigninScreen from './screen/SigninScreen';
import UserEditScreen from './screen/UserEditScreen';
import UserListScreen from './screen/UserListScreen';


function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">AWESOMEWEB</Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {
            userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/grouplist">Group</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="/signin" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }  
          {userInfo && userInfo.isSeller && (
            <div className="dropdown">
              <Link to="#admin">
                Seller {' '} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin {' '} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} exact/>
          <Route path="/product/:id/edit" element={<ProductEditSreen />} exact/>
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodsScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route 
            path="/orderhistory" 
            element={
              <PrivateRoute>
                <OrderHistoryScreen />
              </PrivateRoute>
              } 
            />
          <Route 
            path="/orderlist" 
            element={
              <AdminRoute>
                <OrderListScreen />
              </AdminRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/productlist" 
            element={
              <AdminRoute>
                <ProductListScreen />
              </AdminRoute>
            } 
          />
          <Route 
            path="/userlist" 
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            } 
          />
          <Route 
            path="/user/:id/edit" 
            element={
              <AdminRoute>
                <UserEditScreen />
              </AdminRoute>
            } 
          />
          <Route 
            path="/productlist/seller" 
            element={
              <SellerRoute>
                <ProductListScreen />
              </SellerRoute>
            } 
          />
          <Route 
            path="/orderlist/seller" 
            element={
              <SellerRoute>
                <OrderListScreen />
              </SellerRoute>
            } 
          />
          <Route path="/" element={<HomeScreen />} />
        </Routes>  
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
