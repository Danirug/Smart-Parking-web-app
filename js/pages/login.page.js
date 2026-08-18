// If already logged in, go straight to the dashboard
if (getUser()) {
  window.location.href = 'dashboard.html';
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const emailId = document.getElementById('emailId').value.trim();
  const password = document.getElementById('password').value;

  setLoading(btn, true, 'Signing in...');
  try {
    const res = await apiPost('/login', { emailId, password });
    // On success the API returns the user object directly (no wrapper)
    if (res.userId) {
      saveUser(res);
      window.location.href = 'dashboard.html';
    } else {
      showAlert('danger', res.message || 'Invalid email or password');
    }
  } catch (err) {
    showAlert('danger', 'Could not reach the server. Check your API URL in js/config.js');
  } finally {
    setLoading(btn, false);
  }
});
