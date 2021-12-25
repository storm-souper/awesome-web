import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/mine',
  isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
  })
);

orderRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const orders = await Order.find({...sellerFilter}).populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/', 
  isAuth,
  expressAsyncHandler(async(req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({message: 'Cart is empty'});
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemPrice: req.body.itemPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
        seller: req.body.orderItems[0].seller,
      });
      const createdOrder = await order.save();
      res.status(201).send({message: 'New order created', order: createdOrder});
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(401).send({message: 'Order not found'});
    }
  }),
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = { 
        id: req.body.id, 
        status: req.body.status,
        update_time: req.body.update_time, 
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({message: 'Order Paid', order: updatedOrder});
    } else {
      res.status(404).send({message: 'Order not found'});
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).send({message: 'Order Not Found'});
    } else {
      const deletedOrder = await order.remove();
      if (!deletedOrder) {
        res.status(505).send({message: 'Error in deleting order'});      
      } else {
        res.send({message: 'Order Deleted', order: deletedOrder});
      }
    }
  }),
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const deliveredOrder = await order.save();
      res.send({message: 'Order Delivered', order: deliveredOrder});
    } else {
      res.status(404).send({message: 'Order not found'});
    }
  })
);

export default orderRouter;