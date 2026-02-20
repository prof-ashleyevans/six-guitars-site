import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';
const SALT = '6guitars_admin_2026';
const ADMIN_PASSWORD = '6Gu!t@r$2026';

function getExpectedToken() {
    return crypto.createHmac('sha256', SALT).update(ADMIN_PASSWORD).digest('hex');
}

/** Check if the given password matches the admin password. */
export function verifyAdminPassword(input) {
    return input === ADMIN_PASSWORD;
}

/** Set auth cookie on response. Call after verifying password. */
export function setAuthCookie(res) {
    const token = getExpectedToken();
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`);
}

/** Clear auth cookie. */
export function clearAuthCookie(res) {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
}

/** Check if request has valid admin cookie. */
export function isAdminAuthenticated(req) {
    const cookie = req.headers.cookie || '';
    const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const token = match ? match[1].trim() : '';
    return token === getExpectedToken();
}

/** Require auth: returns 401 if not authenticated. */
export function requireAdmin(req, res) {
    if (!isAdminAuthenticated(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return false;
    }
    return true;
}
