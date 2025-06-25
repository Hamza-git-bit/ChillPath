const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/products.json');

//  Load products from JSON file
function loadProducts() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Save products to JSON file
function saveProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

//  GET all products
router.get('/', (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// POST a new product
router.post('/', (req, res) => {
  const { name, unit, shelfLife } = req.body;

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
