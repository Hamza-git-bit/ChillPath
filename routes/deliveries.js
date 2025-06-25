const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/deliveries.json');

function loadDeliveries() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function saveDeliveries(deliveries) {
  fs.writeFileSync(filePath, JSON.stringify(deliveries, null, 2));
}

// GET /api/deliveries
router.get('/', (req, res) => {
  const deliveries = loadDeliveries();
  res.json(deliveries);
});

// POST /api/deliveries
router.post('/', (req, res) => {
  const { productId, outletId, quantity, date, temperature } = req.body;

  if (
    !productId ||
    !outletId ||
    !quantity ||
    !date ||
    temperature === null ||
    isNaN(temperature)
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const deliveries = loadDeliveries();

  const newDelivery = {
    id: deliveries.length > 0 ? deliveries[deliveries.length - 1].id + 1 : 1,
    productId,
    outletId,
    quantity,
    date,
    temperature
  };

  deliveries.push(newDelivery);
  saveDeliveries(deliveries);

  let message = 'Delivery recorded.';

  if (temperature < 2 || temperature > 8) {
    message += ' Temperature out of range.';
  }

  res.status(201).json({ message, delivery: newDelivery });
});

// DEL /api/deliveries/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let deliveries = loadDeliveries();

  const index = deliveries.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Delivery not found' });
  }

  deliveries.splice(index, 1);
  saveDeliveries(deliveries);

  res.json({ message: 'Delivery deleted' });
});

module.exports = router;