const express = require('express');
const { loadData, saveData } = require('../utils/fileStorage');
const router = express.Router();

//  GET all products
router.get('/', (req, res) => {
const products = loadData('products.json');

  res.json(products);
});

// POST a new product
router.post('/', (req, res) => {
  const { name, unit, shelfLife } = req.body;

// Basic validation
  if (!name || !unit || !shelfLife) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

    const products = loadData('products.json');

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    unit,
    shelfLife
  };

  products.push(newProduct);
  saveData('products.json', products);

  res.status(201).json({ message: 'Product added', product: newProduct });
});

module.exports = router;
