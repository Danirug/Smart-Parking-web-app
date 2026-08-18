// Populate the client dropdown so the user registers under an existing parking client
async function loadClients() {
  const select = document.getElementById('clientId');
  try {
    const res = await apiGet('/GetAllClients');
    const clients = res.data || res || [];
    if (Array.isArray(clients) && clients.length > 0) {
      select.innerHTML =
        '<option value="">Select a client...</option>' +
        clients
          .map((c) => `<option value="${c.clientId}">${c.clientName} (${c.businessName ?? ''})</option>`)
          .join('');
    } else {
      select.innerHTML = '<option value="">No clients found</option>';
    }
  } catch {
    select.innerHTML = '<option value="">Failed to load clients</option>';
  }
}
loadClients();

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('registerBtn');

  const body = {
    fullName: document.getElementById('fullName').value.trim(),
    emailId: document.getElementById('emailId').value.trim(),
    mobileNo: document.getElementById('mobileNo').value.trim(),
    password: document.getElementById('password').value,
    clientId: parseInt(document.getElementById('clientId').value, 10),
  };

  setLoading(btn, true, 'Registering...');
  try {
    const res = await apiPost('/register', body);
    // On success the API returns the created user object directly (no wrapper)
    if (res.userId) {
      showAlert('success', 'Account created! Redirecting to login...');
      setTimeout(() => (window.location.href = 'login.html'), 1500);
    } else {
      showAlert('danger', res.message || 'Registration failed');
    }
  } catch {
    showAlert('danger', 'Could not reach the server. Check your API URL in js/config.js');
  } finally {
    setLoading(btn, false);
  }
});
