export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email } = req.body;

    console.log('📧 Subscribe request received:', { name, email });
    console.log('🔑 API Key exists:', !!process.env.BREVO_API_KEY);
    console.log('📋 List ID:', process.env.BREVO_LIST_ID);

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

        const responseData = await response.json();
        console.log('📬 Brevo response status:', response.status);
        console.log('📬 Brevo response:', responseData);

        if (!response.ok) {
            console.error('❌ Brevo error:', responseData);
            return res.status(500).json({ error: 'Brevo failed', details: responseData });
        }

        console.log('✅ Successfully subscribed:', email);
        return res.status(200).json({ message: 'Subscribed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
