import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const products = await Product.find({...sellerFilter});
    res.send(products); 
  }),
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts}); 
  }),
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product); 
    } else {
      res.status(404).send({message: 'Product not Found'});
    }
  }),
);

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: `sample name ${Date.now()}`,
      image: '/images/product-1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand', 
      countInStocks: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description', 
      seller: req.user._id,
    });
    const createdProduct = await product.save();
    res.send({message: 'Product Created', product: createdProduct});
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler (async (req, res) => {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStocks = req.body.countInStocks;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({message: 'Product Updated', product: updatedProduct});
    } else {
      res.status(404).send({message: 'Product Not Found'});
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (!product) {
      res.status(404).send({
        message: 'Product Not Found',
      });
    } else {
      const deletedProduct = await product.remove();
      if (deletedProduct) {
        res.send({message: 'Product Deleted', product: deletedProduct});
      } else {
        res.status(505).send({message: 'Error in deleting product'});
      }  
    };
  })
);

export default productRouter;
