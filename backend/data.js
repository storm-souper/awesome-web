/* eslint-disable linebreak-style */
import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Phuong',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123', 8),
      isAdmin: true
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123', 8),
      isAdmin: false
    },
  ],
  products: [
    {
      name: 'DJ-Jenny-Yen',
      category: 'Sexy',
      image: '/images/product-1.jpg',
      price: 59,
      brand: 'Vietnam',
      rating: 4.5,
      numReviews: 10,
      countInStocks: 6,
      description: 'full service'
    },
    {
      name: 'White Witch',
      category: 'Sexy',
      image: '/images/product-2.jpg',
      price: 54,
      brand: 'Vietnam',
      rating: 4.3,
      numReviews: 12,
      countInStocks: 4,
      description: 'full service'
    },
    {
      name: 'Super Maid',
      category: 'Sexy',
      image: '/images/product-3.jpg',
      price: 78,
      brand: 'France',
      rating: 4.6,
      numReviews: 12,
      countInStocks: 0,
      description: 'full service but no hardcore'
    },
    {
      name: 'Queen Mico',
      category: 'Cute',
      image: '/images/product-4.jpg',
      price: 67,
      brand: 'Korea',
      rating: 4.2,
      numReviews: 17,
      countInStocks: 3,
      description: 'full service'
    },
    {
      name: 'Trang Le',
      category: 'Sexy',
      image: '/images/product-5.jpg',
      price: 69,
      brand: 'Vietnam',
      rating: 4.5,
      numReviews: 13,
      countInStocks: 9,
      description: 'full service but no hardcore'
    },
    {
      name: 'Secret Secretary',
      category: 'Cute',
      image: '/images/product-6.jpg',
      price: 40,
      brand: 'China',
      rating: 4.2,
      numReviews: 15,
      countInStocks: 4,
      description: 'full service'
    },
    {
      name: 'Tattoo girl',
      category: 'Sexy',
      image: '/images/product-7.jpg',
      price: 50,
      brand: 'Vietnam',
      rating: 4.2,
      numReviews: 17,
      countInStocks: 7,
      description: 'full service'
    },
  ],
};

export default data;