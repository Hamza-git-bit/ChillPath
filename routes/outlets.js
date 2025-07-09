const express = require('express');
const { loadData, saveData } = require('../utils/fileStorage');
const router = express.Router();

// GET /api/outlets
router.get('/', (req, res) => {
  const outlets = loadOutlets();
  res.json(outlets);
});

// POST /api/outlets
router.post('/', (req, res) => {
  const { name, contact } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: 'Name and contact required.' });
  }

  const outlets = loadData('outlets.json');

  const newOutlet = {
    id: outlets.length > 0 ? outlets[outlets.length - 1].id + 1 : 1,
    name,
    contact
  };

  outlets.push(newOutlet);
  saveData('outlets.json', outlets);

  res.status(201).json({ message: 'Outlet added', outlet: newOutlet });
});

module.exports = router;
