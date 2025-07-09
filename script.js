const API_URL = "https://reto-spa.onrender.com";
let users = [];

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    users = await res.json();
    renderUsers();
  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
}

function renderUsers() {
  const list = document.getElementById('userList');
  list.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user';
    div.innerHTML = `
      <img src="./src/imgs/Incognito.jpeg" alt="User">
      <div>${user.name}</div>
      <div>${user.email}</div>
      <div>${user.phone}</div>
      <div>${user.enrollNumber}</div>
      <div>${user.dateOfAdmission}</div>
      <div class="actions">
        <button onclick="editUser(${user.id})">✏️</button>
        <button onclick="deleteUser(${user.id})">🗑️</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function openForm() {
  document.getElementById('editId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('enrollNumber').value = '';
  document.getElementById('dateOfAdmission').value = '';
  document.getElementById('userForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('userForm').style.display = 'none';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10,15}$/.test(phone);
}

async function saveUser() {
  const id = document.getElementById('editId').value;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const enrollNumber = document.getElementById('enrollNumber').value.trim();
  const dateOfAdmission = document.getElementById('dateOfAdmission').value;

  if (!name || !email || !phone || !enrollNumber || !dateOfAdmission) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (!validateEmail(email)) {
    alert('Correo inválido');
    return;
  }

  if (!validatePhone(phone)) {
    alert('Teléfono inválido');
    return;
  }

  const userData = { name, email, phone, enrollNumber, dateOfAdmission };

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), ...userData })
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
    }

    await loadUsers();
    closeForm();
  } catch (err) {
    console.error("Error guardando usuario:", err);
  }
}

async function deleteUser(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    await loadUsers();
  } catch (err) {
    console.error("Error eliminando usuario:", err);
  }
}

function editUser(id) {
  const user = users.find(u => u.id == id);
  if (!user) {
    alert("Usuario no encontrado.");
    return;
  }

  document.getElementById('editId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('phone').value = user.phone;
  document.getElementById('enrollNumber').value = user.enrollNumber;
  document.getElementById('dateOfAdmission').value = user.dateOfAdmission;
  document.getElementById('userForm').style.display = 'block';
}

loadUsers();
