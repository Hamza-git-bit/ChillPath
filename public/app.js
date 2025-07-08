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
async function loadDeliveries() {
  const tableBody = document.getElementById('deliveryTableBody');
  if (!tableBody) return;

  try {
    const res = await fetch('/api/deliveries');
    const deliveries = await res.json();

    tableBody.innerHTML = ''; // Clear old rows

    deliveries.forEach(delivery => {
      const tr = document.createElement('tr');

      const temp = delivery.temperature;
      const status =
        temp < 2 || temp > 8 ? 'At Risk' : 'OK';

      tr.innerHTML = `
        <td>${delivery.id}</td>
        <td>${delivery.productId}</td>
        <td>${delivery.outletId}</td>
        <td>${delivery.quantity}</td>
        <td>${delivery.date}</td>
        <td>${delivery.temperature}</td>
        <td>${status}</td>
<td><button data-id="${delivery.id}" class="deleteBtn">Delete</button></td>
      `;

      // Optional: color risky rows
      if (status === 'At Risk') {
        tr.style.color = 'red';
      }

      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error('Error loading deliveries:', err);
  }
}
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
});

loadDeliveries();
const clearBtn = document.getElementById('clearTableBtn');

if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    const tableBody = document.getElementById('deliveryTableBody');
    tableBody.innerHTML = '';
  });
}
