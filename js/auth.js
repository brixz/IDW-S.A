document.getElementById('loginForm').addEventListener('submit', async function(e){
    e.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
   
    const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
    });

    const data = await res.json();

  if (res.ok) {
     sessionStorage.setItem('accessToken', data.token);
     window.location.href = 'admin_users.html';
  } else {
     alert('Credenciales inválidas');
    // document.getElementById('mensaje').textContent = 'Credenciales incorrectas';
  }
});
  //   if (username === 'user' && password === 'pass') {
  //     sessionStorage.setItem('accessToken', 'fake-token');
  //     window.location.href = 'admin_users.html';
  //   } else {
  //     alert('Credenciales inválidas');
  //   }
  // });