if (!sessionStorage.getItem('accessToken')) {
  window.location.href = 'login.html';
}

const API = 'https://dummyjson.com/users';
const tbody = document.getElementById('usersTbody');
let users = [];

async function fetchUsers() {
  const res = await fetch(`${API}?limit=100`);
  const data = await res.json();
  users = data.users;
  renderTable();
}

function renderTable() {
  tbody.innerHTML = '';
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.firstName}</td>
      <td>${u.lastName}</td>
      <td>${u.age}</td>
      <td>${u.email}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editUser(${u.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('accessToken');
  window.location.href = 'login.html';
});

document.getElementById('userForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = +document.getElementById('userId').value;
  const payload = {
    firstName: document.getElementById('firstName').value,
    lastName:  document.getElementById('lastName').value,
    age:       +document.getElementById('age').value,
    email:     document.getElementById('email').value
  };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(`${API}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
  document.getElementById('userForm').reset();
  document.getElementById('userId').value = '';
  fetchUsers();
});

window.editUser = id => {
  const u = users.find(x => x.id === id);
  document.getElementById('userId').value    = u.id;
  document.getElementById('firstName').value = u.firstName;
  document.getElementById('lastName').value  = u.lastName;
  document.getElementById('age').value       = u.age;
  document.getElementById('email').value     = u.email;
};

window.deleteUser = async id => {
  if (!confirm('¿Eliminar usuario?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  fetchUsers();
};

fetchUsers();
