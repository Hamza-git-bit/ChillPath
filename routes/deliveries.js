const express = require('express');
const { loadData, saveData } = require('../utils/fileStorage');
const router = express.Router();

// GET /api/deliveries
router.get('/', (req, res) => {
  const deliveries = loadData('deliveries.json');
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

  const deliveries = loadData('deliveries.json');

  const newDelivery = {
    id: deliveries.length > 0 ? deliveries[deliveries.length - 1].id + 1 : 1,
    productId,
    outletId,
    quantity,
    date,
    temperature
  };

  deliveries.push(newDelivery);
  saveData('deliveries.json', deliveries);

  let message = 'Delivery recorded.';
  if (temperature < 2 || temperature > 8) {
    message += ' Temperature out of range.';
  }

  res.status(201).json({ message, delivery: newDelivery });
});

// PUT /api/deliveries/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { productId, outletId, quantity, temperature, date } = req.body;

if (
  productId == null ||
  outletId == null ||
  quantity == null ||
  date == null ||
  temperature == null ||
  isNaN(temperature)
) {
  return res.status(400).json({ message: 'All fields are required.' });
}

  const deliveries = loadData('deliveries.json');
  const index = deliveries.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Delivery not found.' });
  }

  deliveries[index] = {
    id,
    productId,
    outletId,
    quantity,
    temperature,
    date
  };

  saveData('deliveries.json', deliveries);
  res.json({ message: 'Delivery updated', delivery: deliveries[index] });
});
// DELETE /api/deliveries/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deliveries = loadData('deliveries.json');
  const index = deliveries.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Delivery not found.' });
  }

  deliveries.splice(index, 1);
  saveData('deliveries.json', deliveries);
  res.json({ message: 'Delivery deleted' });
});

module.exports = router;