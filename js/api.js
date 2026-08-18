// Generic API helpers — all requests go through these functions

const HEADERS = { 'Content-Type': 'application/json' };

// The API sometimes returns plain text (e.g. validation errors) instead of JSON,
// so parse safely and normalise everything to the {result, message, data} shape.
async function parseResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { result: res.ok, message: text, data: null };
  }
}

async function apiGet(path) {
  const res = await fetch(API_BASE + MODULE + path);
  return parseResponse(res);
}

async function apiPost(path, body) {
  const res = await fetch(API_BASE + MODULE + path, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

async function apiPut(path, body) {
  const res = await fetch(API_BASE + MODULE + path, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return parseResponse(res);
}

async function apiDelete(path) {
  const res = await fetch(API_BASE + MODULE + path, { method: 'DELETE' });
  return parseResponse(res);
}
