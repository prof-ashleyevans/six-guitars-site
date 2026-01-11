import { submitNotification } from '../../lib/airtable';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, showName, showDate, showTime, venue } = req.body;

        // Validate required fields
        if (!name || !email || !showName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Submit to Airtable
        const airtableResult = await submitNotification({
            name,
            email,
            showName,
            showDate,
            showTime,
            venue,
        });

        // Add to Brevo email list
        const brevoApiKey = process.env.BREVO_API_KEY;
        const brevoListId = process.env.BREVO_LIST_ID;

        if (brevoApiKey && brevoListId) {
            try {
                const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: {
                        'api-key': brevoApiKey,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        attributes: {
                            FIRSTNAME: name,
                            SHOW_NAME: showName,
                            SHOW_DATE: showDate,
                            SHOW_TIME: showTime,
                            VENUE: venue,
                        },
                        listIds: [parseInt(brevoListId)],
                        updateEnabled: true,
                    }),
                });

                if (brevoResponse.ok) {
                    console.log('✅ Contact added to Brevo');
                } else {
                    const brevoError = await brevoResponse.json();
                    console.warn('⚠️ Brevo warning:', brevoError);
                    // Don't fail the request if Brevo fails
                }
            } catch (brevoError) {
                console.error('❌ Error adding to Brevo:', brevoError);
                // Don't fail the request if Brevo fails
            }
        }

        res.status(200).json({ 
            success: true, 
            message: 'You will be notified when tickets become available!',
            recordId: airtableResult.id 
        });
    } catch (err) {
        console.error('API error:', err);
        res.status(500).json({ error: 'Failed to submit notification request' });
    }
}
