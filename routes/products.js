const express = require('express');
const { loadData, saveData } = require('../utils/fileStorage');
const router = express.Router();

//  GET all products
router.get('/', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// POST a new product
router.post('/', (req, res) => {
  const { name, unit, shelfLife } = req.body;

// Basic validation
  if (!name || !unit || !shelfLife) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const products = loadProducts();

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    unit,
    shelfLife
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({ message: 'Product added', product: newProduct });
});

module.exports = router;
