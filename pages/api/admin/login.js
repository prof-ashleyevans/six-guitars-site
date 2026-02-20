import { setAuthCookie, verifyAdminPassword } from '../../../lib/admin-auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { password: bodyPassword } = req.body || {};
    if (verifyAdminPassword(bodyPassword)) {
        setAuthCookie(res);
        return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ error: 'Invalid password' });
}
