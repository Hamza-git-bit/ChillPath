const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/outlets.json');

// Helpers
function loadOutlets() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function saveOutlets(outlets) {
  fs.writeFileSync(filePath, JSON.stringify(outlets, null, 2));
}

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

  const outlets = loadOutlets();

  const newOutlet = {
    id: outlets.length > 0 ? outlets[outlets.length - 1].id + 1 : 1,
    name,
    contact
  };

  outlets.push(newOutlet);
  saveOutlets(outlets);

  res.status(201).json({ message: 'Outlet added', outlet: newOutlet });
});

module.exports = router;
