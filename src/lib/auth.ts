/**
 * Client-side admin authentication.
 *
 * NOTE: This is a front-end-only gate suitable for a static marketing site
 * with no backend. Credentials live in the browser; for a production system
 * with sensitive data, move auth to a real server. The default credentials
 * below can be changed from the admin Settings page (persisted to localStorage).
 */

const CREDENTIALS_KEY = 'mch_admin_credentials';
const SESSION_KEY = 'mch_admin_session';

export const DEFAULT_USERNAME = 'admin';
export const DEFAULT_PASSWORD = 'Modulux@2026';

interface Credentials {
  username: string;
  password: string;
}

const getCredentials = (): Credentials => {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (raw) return JSON.parse(raw) as Credentials;
  } catch {
    /* fall through to defaults */
  }
  return { username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD };
};

export const getUsername = (): string => getCredentials().username;

export const login = (username: string, password: string): boolean => {
  const creds = getCredentials();
  const ok =
    username.trim() === creds.username && password === creds.password;
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }
  return ok;
};

export const logout = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(SESSION_KEY) === 'true';

export const changeCredentials = (
  currentPassword: string,
  newUsername: string,
  newPassword: string
): { ok: boolean; error?: string } => {
  const creds = getCredentials();
  if (currentPassword !== creds.password) {
    return { ok: false, error: 'Current password is incorrect.' };
  }
  if (!newUsername.trim()) {
    return { ok: false, error: 'Username cannot be empty.' };
  }
  if (newPassword.length < 6) {
    return { ok: false, error: 'New password must be at least 6 characters.' };
  }
  localStorage.setItem(
    CREDENTIALS_KEY,
    JSON.stringify({ username: newUsername.trim(), password: newPassword })
  );
  return { ok: true };
};
