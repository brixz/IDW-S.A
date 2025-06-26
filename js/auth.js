document.getElementById('loginForm')
  .addEventListener('submit', e => {
    e.preventDefault();

    const username = document.getElementById('user').value.trim();
    const password = document.getElementById('pass').value.trim();

    if (username === 'user' && password === 'pass') {
      sessionStorage.setItem('accessToken', 'fake-token');
      window.location.href = 'admin_users.html';
    } else {
      alert('Credenciales inválidas');
    }
  });
