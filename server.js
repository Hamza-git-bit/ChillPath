const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Enable JSON parsing for API
app.use(express.json());

// static files from /public (your frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Import & mount products API routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Add catch-all root route (optional, but helpful)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//  listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use('/api/outlets', require('./routes/outlets'));
app.use('/api/deliveries', require('./routes/deliveries'));

// In app.js or server.js
app.use(express.static('public')); // if your CSS is inside /public
