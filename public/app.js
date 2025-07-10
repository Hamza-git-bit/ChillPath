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
  const filterProductSelect = document.getElementById('filterProduct');

  try {
    const [productsRes, outletsRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/outlets')
    ]);
    const products = await productsRes.json();
    const outlets = await outletsRes.json();

    if (productSelect) {
      productSelect.innerHTML = '';
      products.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        productSelect.appendChild(option);
      });
    }

    if (filterProductSelect) {
      filterProductSelect.innerHTML = '<option value="">All</option>';
      products.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        filterProductSelect.appendChild(option);
      });
    }

    if (outletSelect) {
      outletSelect.innerHTML = '';
      outlets.forEach(o => {
        const option = document.createElement('option');
        option.value = o.id;
        option.textContent = o.name;
        outletSelect.appendChild(option);
      });
    }
  } catch (err) {
    console.error('Failed to load dropdowns', err);
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
      const method = editingDeliveryId ? 'PUT' : 'POST';
const url = editingDeliveryId ? `/api/deliveries/${editingDeliveryId}` : '/api/deliveries';

const response = await fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ productId, outletId, quantity, temperature, date })
});

      const result = await response.json();
      document.getElementById('deliveryMsg').innerText = result.message || 'Delivery recorded.';
      this.reset();
      editingDeliveryId = null;
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
  const filterProductSelect = document.getElementById('filterProduct');
  const selectedProductId = filterProductSelect?.value;

  if (!tableBody) return;

  try {
    const [productsRes, outletsRes, deliveriesRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/outlets'),
      fetch('/api/deliveries')
    ]);
    const products = await productsRes.json();
    const outlets = await outletsRes.json();
    let deliveries = await deliveriesRes.json();

    let filteredDeliveries = deliveries;

// Apply date filter
const start = startDateInput?.value;
const end = endDateInput?.value;

if (start) {
  filteredDeliveries = filteredDeliveries.filter(d => new Date(d.date) >= new Date(start));
}
if (end) {
  filteredDeliveries = filteredDeliveries.filter(d => new Date(d.date) <= new Date(end));
}

    // Apply filter
    if (selectedProductId) {
      deliveries = deliveries.filter(d => d.productId == selectedProductId);
    }

    deliveries.sort((a, b) => new Date(b.date) - new Date(a.date));
    tableBody.innerHTML = '';

    deliveries.forEach(delivery => {
      const tr = document.createElement('tr');
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
        <td>
  <button data-id="${delivery.id}" class="editBtn">Edit</button>
  <button data-id="${delivery.id}" class="deleteBtn">Delete</button>
</td>
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

// ===== DELETE BUTTONS =====
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('deleteBtn')) {
    const id = e.target.getAttribute('data-id');
    if (!confirm('Are you sure you want to delete this delivery?')) return;

    try {
      const res = await fetch(`/api/deliveries/${id}`, { method: 'DELETE' });
      const result = await res.json();
      alert(result.message || 'Deleted');
      loadDeliveries();
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

// ===== CLEAR BUTTONS =====
document.getElementById('clearTableBtn')?.addEventListener('click', () => {
  document.getElementById('deliveryTableBody').innerHTML = '';
});

document.getElementById('clearProductListBtn')?.addEventListener('click', () => {
  const productList = document.getElementById('productList');
  if (productList) productList.innerHTML = '';
});

document.getElementById('clearOutletListBtn')?.addEventListener('click', () => {
  const outletList = document.getElementById('outletList');
  if (outletList) outletList.innerHTML = '';
});

document.getElementById('clearDeliveryFormBtn')?.addEventListener('click', () => {
  deliveryForm?.reset();
});
// ===== DATE RANGE FILTER =====
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const filterBtn = document.getElementById('applyDateFilter');

if (filterBtn) {
  filterBtn.addEventListener('click', () => {
    loadDeliveries();
  });
}
