import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../action/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen() {
  const navigate = useNavigate();
  //useSelector select state from orderMineList reducer in store
  const orderMineList = useSelector(state => state.orderMineList);
  const {loading, error, orders} = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch action listOrderMine
    dispatch(listOrderMine())
  }, [dispatch])
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
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
