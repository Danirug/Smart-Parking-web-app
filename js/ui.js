// Shared UI helpers (Bootstrap based)

function showAlert(type, msg, containerId = 'alert') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

function setLoading(buttonEl, loading, loadingText = 'Please wait...') {
  if (loading) {
    buttonEl.dataset.originalText = buttonEl.innerHTML;
    buttonEl.disabled = true;
    buttonEl.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${loadingText}`;
  } else {
    buttonEl.disabled = false;
    buttonEl.innerHTML = buttonEl.dataset.originalText;
  }
}
