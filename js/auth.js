// Session handling and page guards

function saveUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const raw = sessionStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

function logout() {
  sessionStorage.removeItem('user');
  window.location.href = rootPath() + 'pages/login.html';
}

// Redirect to login if not authenticated. Call at the top of every protected page.
function requireAuth() {
  if (!getUser()) {
    window.location.href = rootPath() + 'pages/login.html';
  }
}

// Works out how many levels deep the current page is so links resolve correctly
function rootPath() {
  const path = window.location.pathname;
  if (path.includes('/pages/admin/') || path.includes('/pages/operations/')) return '../../';
  if (path.includes('/pages/')) return '../';
  return './';
}
