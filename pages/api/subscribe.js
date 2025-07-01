export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email } = req.body;

    try {
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email,
                attributes: { FIRSTNAME: name },
                listIds: [parseInt(process.env.BREVO_LIST_ID)],
                updateEnabled: true,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Brevo error:', error);
            return res.status(500).json({ error: 'Brevo failed' });
        }

        return res.status(200).json({ message: 'Subscribed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
