import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOrder, listOrder } from '../action/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constant/orderConstants';

export default function OrderListScreen() {
  const {pathname} = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;

  const navigate = useNavigate();
  //useSelector select state from orderMineList reducer in store
  const orderList = useSelector(state => state.orderList);
  const {loading, error, orders} = orderList;
  const orderDelete = useSelector(state => state.orderDelete);
  const {
    loading: loadingDelete, 
    error: errorDelete, 
    success: successDelete
  } = orderDelete;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch action listOrderMine
    if (successDelete) {
      dispatch({type: ORDER_DELETE_RESET});
    }
    dispatch(listOrder({seller: sellerMode ? userInfo._id : ''}));
  }, [dispatch, successDelete, userInfo, sellerMode]);

  const deleteHandler = (order) => {
    // TODO: dispatch delete order action
    if (window.confirm('Are you sure to delete this order?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div>
      <h1>Order List</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ITEM</th>
              <th>ITEM QTY</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  {order.user.name}
                </td>
                <td>
                  {order.orderItems.map(orderItem => <li>{orderItem.name}</li>)}
                </td>
                <td>
                  {order.orderItems.map(orderItem => <li className="order-item-qty">{orderItem.qty}</li>)}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid yet'}</td>
                <td>
                  {order.isDelivered 
                    ? order.deliveredAt.substring(0, 10) 
                    : 'Not delivered yet'
                  }
                </td>
                <td>
                  <button 
                    type="button" 
                    className="small"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </button>
                  <button
                    type="button" 
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>   
              </tr>
            ))}
          </tbody>
        </table>
      )
      }
    </div>
  )
};
