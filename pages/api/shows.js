export default async function handler(req, res) {
    const {
        AIRTABLE_PERSONAL_ACCESS_TOKEN,
        AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_NAME,
    } = process.env;

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?sort[0][field]=date&sort[0][direction]=asc`;

    try {
        const airtableRes = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!airtableRes.ok) {
            throw new Error(`Airtable request failed: ${airtableRes.status}`);
        }

        const { records } = await airtableRes.json();

        // ⏰ today as ISO string “YYYY-MM-DD”
        const todayISO = new Date().toISOString().split("T")[0];

        // 🔄 normalise, filter, sort
        const allShows = [];

        for (const r of records) {
            const f = r.fields;

            // Split time field into multiple entries (e.g., "8:00 PM, 10:00 PM")
            const times = (f.time || "").split(",").map((t) => t.trim());

            for (const time of times) {
                allShows.push({
                    showName: f.ShowName,
                    date: f.date,
                    time,
                    venue: f.Venue,
                    location: f.location,
                    link: f.ticketLink,
                    fullBand: String(f.fullBand).toLowerCase() === "yes",
                });
            }
        }

// ⏰ Today as ISO string “YYYY-MM-DD”
// const todayISO = new Date().toISOString().split("T")[0];

        const shows = allShows
            .filter(
                (s) =>
                    s.showName?.trim().toLowerCase() === "6 guitars" &&
                    s.date >= todayISO
            )
            .sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date);
            }

            // Same date → sort by time
            const parseTime = (t) => {
                const [hours, minutesPart] = t.split(":");
                const [minutes, modifier] = minutesPart.split(" ");
                let hour = parseInt(hours, 10);
                if (modifier.toLowerCase() === "pm" && hour !== 12) hour += 12;
                if (modifier.toLowerCase() === "am" && hour === 12) hour = 0;
                return hour * 60 + parseInt(minutes, 10);
            };

            return parseTime(a.time || "00:00 AM") - parseTime(b.time || "00:00 AM");
        });



        res.status(200).json(shows);
    } catch (err) {
        console.error("Airtable API error:", err);
        res.status(500).json({ error: "Failed to fetch shows from Airtable." });
    }
}
