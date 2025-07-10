
let editingDeliveryId = null;

// ===== PRODUCT FORM =====
const productForm = document.getElementById('productForm');

if (productForm) {
  productForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const unit = document.getElementById('productUnit').value;
    const shelfLife = document.getElementById('productShelfLife').value;

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, unit, shelfLife })
      });

      const result = await response.json();
      document.getElementById('productMsg').innerText = result.message || 'Product added.';
      this.reset();
    } catch (error) {
      console.error('Error adding product:', error);
      document.getElementById('productMsg').innerText = 'Failed to add product.';
    }
  });
}

// ===== OUTLET FORM =====
const outletForm = document.getElementById('outletForm');

if (outletForm) {
  outletForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('outletName').value;
    const contact = document.getElementById('outletContact').value;

    try {
      const response = await fetch('/api/outlets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact })
      });

      const result = await response.json();
      document.getElementById('outletMsg').innerText = result.message || 'Outlet added.';
      this.reset();
    } catch (error) {
      console.error('Error adding outlet:', error);
      document.getElementById('outletMsg').innerText = 'Failed to add outlet.';
    }
  });
}

// ===== LOAD DROPDOWNS =====
async function loadDropdowns() {
  const productSelect = document.getElementById('deliveryProduct');
  const outletSelect = document.getElementById('deliveryOutlet');

  try {
    const [productsRes, outletsRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/outlets')
    ]);

    const products = await productsRes.json();
    const outlets = await outletsRes.json();

    products.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = p.name;
      productSelect.appendChild(option);
    });

    outlets.forEach(o => {
      const option = document.createElement('option');
      option.value = o.id;
      option.textContent = o.name;
      outletSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Failed dropdowns', err);
  }
}
loadDropdowns();

// ===== DELIVERY FORM =====
const deliveryForm = document.getElementById('deliveryForm');

if (deliveryForm) {
  deliveryForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('deliveryProduct').value);
    const outletId = parseInt(document.getElementById('deliveryOutlet').value);
    const quantity = parseFloat(document.getElementById('deliveryQuantity').value);
    const temperature = parseFloat(document.getElementById('deliveryTemperature').value);
    const date = document.getElementById('deliveryDate').value;

    try {
      const response = await fetch('/api/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, outletId, quantity, temperature, date })
      });

      const result = await response.json();
      document.getElementById('deliveryMsg').innerText = result.message || 'Delivery recorded.';
      this.reset();
      loadDeliveries();

    } catch (err) {
      console.error('Failed to add delivery:', err);
      document.getElementById('deliveryMsg').innerText = 'Failed to record delivery.';
    }
  });
}

// ===== LOAD DELIVERIES =====
async function loadDeliveries() {
  const tableBody = document.getElementById('deliveryTableBody');
  if (!tableBody) return;

  try {
    const [productsRes, outletsRes, deliveriesRes] = await Promise.all([
  fetch('/api/products'),
  fetch('/api/outlets'),
  fetch('/api/deliveries')
]);

const products = await productsRes.json();
const outlets = await outletsRes.json();
const deliveries = await deliveriesRes.json();

    tableBody.innerHTML = '';

    deliveries.forEach(delivery => {
  const tr = document.createElement('tr');

  // Find product and outlet details
  const product = products.find(p => p.id === delivery.productId);
  const outlet = outlets.find(o => o.id === delivery.outletId);

  const productName = product ? product.name : `ID ${delivery.productId}`;
  const outletName = outlet ? outlet.name : `ID ${delivery.outletId}`;
  const temp = delivery.temperature;
  const status = temp < 2 || temp > 8 ? 'At Risk' : 'OK';

  tr.innerHTML = `
    <td>${delivery.id}</td>
    <td>${productName}</td>
    <td>${outletName}</td>
    <td>${delivery.quantity}</td>
    <td>${delivery.date}</td>
    <td>${delivery.temperature}</td>
    <td>${status}</td>
    <td><button data-id="${delivery.id}" class="deleteBtn">Delete</button></td>
  `;

  if (status === 'At Risk') {
    tr.style.color = 'red';
  }

  tableBody.appendChild(tr);
});

  } catch (err) {
    console.error('Error loading deliveries:', err);
  }
}
// ===== DELETE And Edit BUTTON HANDLER =====
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('deleteBtn')) {
    const id = e.target.getAttribute('data-id');

    if (!confirm('Are you sure you want to delete this delivery?')) return;

    try {
      const res = await fetch(`/api/deliveries/${id}`, { method: 'DELETE' });
      const result = await res.json();
      alert(result.message || 'Deleted');
      loadDeliveries(); // Refresh table
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  if (e.target.classList.contains('editBtn')) {
    const id = e.target.getAttribute('data-id');

    try {
      const res = await fetch('/api/deliveries');
      const data = await res.json();
      const delivery = data.find(d => d.id == id);
      if (!delivery) return;

      document.getElementById('deliveryProduct').value = delivery.productId;
      document.getElementById('deliveryOutlet').value = delivery.outletId;
      document.getElementById('deliveryQuantity').value = delivery.quantity;
      document.getElementById('deliveryTemperature').value = delivery.temperature;
      document.getElementById('deliveryDate').value = delivery.date;

      editingDeliveryId = delivery.id;
    } catch (err) {
      console.error('Edit failed:', err);
    }
  }
});

// ===== CLEAR TABLE VIEW BUTTON =====
const clearBtn = document.getElementById('clearTableBtn');

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    const tableBody = document.getElementById('deliveryTableBody');
    tableBody.innerHTML = '';
  });
}

// ===== CLEAR PRODUCT VIEW BUTTON =====
const clearProductBtn = document.getElementById('clearProductListBtn');

if (clearProductBtn) {
  clearProductBtn.addEventListener('click', () => {
    const productList = document.getElementById('productList'); // Replace with actual ID
    if (productList) productList.innerHTML = '';
  });
}
// ===== CLEAR Outlet VIEW BUTTON =====
const clearOutletBtn = document.getElementById('clearOutletListBtn');

if (clearOutletBtn) {
  clearOutletBtn.addEventListener('click', () => {
    const outletList = document.getElementById('outletList');
    if (outletList) outletList.innerHTML = '';
  });
}
// ===== CLEAR Delivery VIEW BUTTON =====
const clearDeliveryFormBtn = document.getElementById('clearDeliveryFormBtn');

if (clearDeliveryFormBtn) {
  clearDeliveryFormBtn.addEventListener('click', () => {
    const deliveryForm = document.getElementById('deliveryForm');
    if (deliveryForm) deliveryForm.reset();
  });
}

