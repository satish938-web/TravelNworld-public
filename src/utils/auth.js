// Simple client-side auth utilities using localStorage



export function login(token, user) {
  try {
    localStorage.setItem("TOKEN_KEY", token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    // no-op for SSR or blocked storage
  }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    // no-op
  }
}

export function isAuthenticated() {
  try {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  } catch (e) {
    return false;
  }
}

export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}


