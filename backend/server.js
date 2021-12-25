import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost/awesomeweb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,   
    })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/uploads', uploadRouter)

app.get('/api/config/paypal/', (req, res) => {
  res.send(process.env.PAYPAL_CLENT_ID || 'sb');
});
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

