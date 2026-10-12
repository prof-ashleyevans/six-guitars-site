/**
 * Airtable Service for 6 Guitars Website
 * Fetches show data from Airtable and groups by date/venue
 */

const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

/**
 * Fetch all shows from Airtable
 * @returns {Promise<Array>} Grouped shows array
 */
export async function fetchShows() {
    const {
        AIRTABLE_PERSONAL_ACCESS_TOKEN,
        AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_NAME,
    } = process.env;

    // Debug logging
    console.log('🔍 Fetching shows from Airtable...');
    console.log('🔑 Token exists:', !!AIRTABLE_PERSONAL_ACCESS_TOKEN);
    console.log('📋 Base ID:', AIRTABLE_BASE_ID);
    console.log('📋 Table Name:', AIRTABLE_TABLE_NAME);

    if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
        console.error('❌ Missing Airtable environment variables');
        return [];
    }

    const encodedTableName = encodeURIComponent(AIRTABLE_TABLE_NAME);
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${encodedTableName}?sort[0][field]=Date_for_site&sort[0][direction]=asc`;

    try {
        console.log('🌐 URL:', url);
        
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('❌ Airtable error response:', errorBody);
            throw new Error(`Airtable request failed: ${response.status}`);
        }

        const { records } = await response.json();
        console.log('📊 Records found:', records.length);

        // Map records to show objects
        const allShows = records.map((record) => {
            const f = record.fields;
            // Debug: log raw values
            console.log('📅 Raw Date_for_site:', f.Date_for_site);
            console.log('⭐ Raw fullBand:', f.fullBand, 'Type:', typeof f.fullBand);
            console.log('✅ Raw Enabled_For_Site:', f.Enabled_For_Site);
            return {
                id: record.id,
                showName: f.ShowName || '',
                date: f.Date_for_site || '',
                day: f.Day || '',
                time: f.Time || '',
                venue: f.Venue || '',
                location: f.location || '',
                ticketLink: f.ticketLink || '',
                fullBand: f.fullBand === true || f.fullBand === 'Yes' || f.fullBand === 'yes',
                ticketAvail: f['Ticket Avail'] || 'available',
                onSaleDate: f['On Sale Date'] || '',
                discountCode: f['Discount Code'] || '',
                discountPercentage: f['Discount Percentage'] || '',
                enabledForSite: f.Enabled_For_Site === true,
            };
        });

        // Filter for "6 Guitars" shows that are enabled for the site
        const enabledShows = allShows.filter(
            (show) =>
                show.showName?.trim().toLowerCase() === '6 guitars' &&
                show.enabledForSite
        );
        console.log(`📊 Enabled 6 Guitars shows: ${enabledShows.length}`);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Mark past vs current/upcoming (display still driven by Enabled_For_Site)
        enabledShows.forEach((show) => {
            if (!show.date) {
                show.isPast = false;
                return;
            }
            const showDate = parseShowDate(show.date);
            if (!showDate) {
                show.isPast = false;
                return;
            }
            showDate.setHours(0, 0, 0, 0);
            show.isPast = showDate < today;
        });

        // Past shows first, then current/upcoming; within each group sort by date, venue, time
        enabledShows.sort((a, b) => {
            if (a.isPast !== b.isPast) {
                return a.isPast ? -1 : 1;
            }
            if (a.date !== b.date) {
                return (a.date || '').localeCompare(b.date || '');
            }
            if (a.venue !== b.venue) {
                return (a.venue || '').localeCompare(b.venue || '');
            }
            return parseTime(a.time) - parseTime(b.time);
        });

        // Group shows by date + venue
        const groupedShows = groupShowsByDateAndVenue(enabledShows);
        console.log('📊 Grouped shows:', groupedShows.length);

        return groupedShows;
    } catch (error) {
        console.error('❌ Error fetching shows from Airtable:', error);
        return [];
    }
}

/**
 * Group shows by date and venue
 * @param {Array} shows - Array of show objects
 * @returns {Array} Grouped shows
 */
function groupShowsByDateAndVenue(shows) {
    const grouped = {};

    shows.forEach((show) => {
        // Normalize date for grouping
        const normalizedDate = show.date ? new Date(show.date).toISOString().split('T')[0] : '';
        const key = `${normalizedDate}|${show.venue}`;

        if (!grouped[key]) {
            grouped[key] = {
                groupKey: key,
                date: show.date,
                day: show.day,
                venue: show.venue,
                location: show.location,
                isPast: !!show.isPast,
                performances: [],
            };
        }

        console.log('🎫 Performance:', { time: show.time, fullBand: show.fullBand, ticketAvail: show.ticketAvail, ticketLink: show.ticketLink });
        grouped[key].performances.push({
            id: show.id,
            time: show.time,
            fullBand: show.fullBand,
            ticketAvail: show.ticketAvail,
            ticketLink: show.ticketLink,
            onSaleDate: show.onSaleDate,
            discountCode: show.discountCode,
            discountPercentage: show.discountPercentage,
        });
    });

    return Object.values(grouped);
}

/**
 * Parse YYYY-MM-DD (or similar) as a local date for past/upcoming checks.
 * @param {string} dateStr
 * @returns {Date|null}
 */
function parseShowDate(dateStr) {
    if (!dateStr) return null;
    const str = String(dateStr).trim();
    const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

/**
 * Parse time string to minutes for sorting
 * @param {string} timeStr - Time string (e.g., "7:30 PM")
 * @returns {number} Minutes since midnight
 */
function parseTime(timeStr) {
    if (!timeStr || !timeStr.includes(':')) return 0;
    
    const [hours, minutesPart] = timeStr.split(':');
    const [minutes, modifier] = minutesPart.split(' ');
    
    let hour = parseInt(hours, 10);
    if (modifier?.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (modifier?.toLowerCase() === 'am' && hour === 12) hour = 0;
    
    return hour * 60 + parseInt(minutes, 10);
}

/**
 * Fetch all reviews from Airtable
 * @returns {Promise<Array>} Reviews array
 */
export async function fetchReviews() {
    const {
        AIRTABLE_PERSONAL_ACCESS_TOKEN,
        AIRTABLE_REVIEWS_BASE_ID,
        AIRTABLE_REVIEWS_TABLE_NAME,
    } = process.env;

    // Debug logging
    console.log('🔍 Fetching reviews from Airtable...');
    console.log('🔑 Token exists:', !!AIRTABLE_PERSONAL_ACCESS_TOKEN);
    console.log('📋 Reviews Base ID:', AIRTABLE_REVIEWS_BASE_ID);
    console.log('📋 Reviews Table Name:', AIRTABLE_REVIEWS_TABLE_NAME);

    if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_REVIEWS_BASE_ID || !AIRTABLE_REVIEWS_TABLE_NAME) {
        console.error('❌ Missing Airtable Reviews environment variables');
        return [];
    }

    const encodedTableName = encodeURIComponent(AIRTABLE_REVIEWS_TABLE_NAME);
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_REVIEWS_BASE_ID}/${encodedTableName}`;

    try {
        console.log('🌐 Reviews URL:', url);
        
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('❌ Airtable error response:', errorBody);
            throw new Error(`Airtable request failed: ${response.status}`);
        }

        const { records } = await response.json();
        console.log('📊 Review records found:', records.length);

        // Map records to review objects
        const reviews = records.map((record) => {
            const f = record.fields;
            
            // Get the logo URL from attachments
            const logoUrl = f.Attachments && f.Attachments.length > 0 
                ? f.Attachments[0].url 
                : null;

            return {
                id: record.id,
                name: f.Name || '',
                quote: f.Quote || '',
                status: f.Status || null, // Star rating (could be 5 or null/empty)
                logo: logoUrl,
            };
        });

        console.log('✅ Reviews processed:', reviews.length);
        return reviews;
    } catch (error) {
        console.error('❌ Error fetching reviews from Airtable:', error);
        return [];
    }
}

/**
 * Fetch audience reviews from Airtable (filtered by "6G")
 * @returns {Promise<Array>} Audience reviews array
 */
export async function fetchAudienceReviews() {
    const {
        AIRTABLE_PERSONAL_ACCESS_TOKEN,
        AIRTABLE_AUDIENCE_REVIEWS_BASE_ID,
        AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME,
    } = process.env;

    // Debug logging
    console.log('🔍 Fetching audience reviews from Airtable...');
    console.log('🔑 Token exists:', !!AIRTABLE_PERSONAL_ACCESS_TOKEN);
    console.log('📋 Audience Reviews Base ID:', AIRTABLE_AUDIENCE_REVIEWS_BASE_ID);
    console.log('📋 Audience Reviews Table Name:', AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME);

    if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_AUDIENCE_REVIEWS_BASE_ID || !AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME) {
        console.error('❌ Missing Airtable Audience Reviews environment variables');
        return [];
    }

    const encodedTableName = encodeURIComponent(AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME);
    // Filter for records where Select field contains "6G"
    const filterFormula = encodeURIComponent("FIND('6G', {Select})");
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_AUDIENCE_REVIEWS_BASE_ID}/${encodedTableName}?filterByFormula=${filterFormula}`;

    try {
        console.log('🌐 Audience Reviews URL:', url);
        
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('❌ Airtable error response:', errorBody);
            throw new Error(`Airtable request failed: ${response.status}`);
        }

        const { records } = await response.json();
        console.log('📊 Audience Review records found:', records.length);

        // Map records to review objects
        const reviews = records.map((record) => {
            const f = record.fields;
            
            // Get the photo URL from attachments
            const photoUrl = f.Photo && f.Photo.length > 0 
                ? f.Photo[0].url 
                : null;

            return {
                id: record.id,
                name: f.Name || '',
                quote: f.Quote || '',
                photo: photoUrl,
                select: f.Select || '',
            };
        });

        console.log('✅ Audience Reviews processed:', reviews.length);
        return reviews;
    } catch (error) {
        console.error('❌ Error fetching audience reviews from Airtable:', error);
        return [];
    }
}

/**
 * Submit a notification request to Airtable
 * @param {Object} notificationData - { name, email, showName, showDate, showTime, venue }
 * @returns {Promise<Object>} Created record
 */
export async function submitNotification(notificationData) {
    const {
        AIRTABLE_PERSONAL_ACCESS_TOKEN,
        AIRTABLE_NOTIFICATIONS_BASE_ID,
        AIRTABLE_NOTIFICATIONS_TABLE_NAME,
    } = process.env;

    console.log('🔔 Submitting notification request...');
    console.log('📋 Notifications Base ID:', AIRTABLE_NOTIFICATIONS_BASE_ID);
    console.log('📋 Notifications Table Name:', AIRTABLE_NOTIFICATIONS_TABLE_NAME);

    if (!AIRTABLE_PERSONAL_ACCESS_TOKEN || !AIRTABLE_NOTIFICATIONS_BASE_ID || !AIRTABLE_NOTIFICATIONS_TABLE_NAME) {
        console.error('❌ Missing Airtable Notifications environment variables');
        throw new Error('Missing Airtable configuration');
    }

    const encodedTableName = encodeURIComponent(AIRTABLE_NOTIFICATIONS_TABLE_NAME);
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_NOTIFICATIONS_BASE_ID}/${encodedTableName}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    Name: notificationData.name,
                    email: notificationData.email,
                    showName: notificationData.showName,
                    showDate: notificationData.showDate,
                    showTime: notificationData.showTime,
                    Venue: notificationData.venue,
                    Status: 'pending',
                },
            }),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error('❌ Airtable error response:', errorBody);
            throw new Error(`Airtable request failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Notification submitted:', result.id);
        return result;
    } catch (error) {
        console.error('❌ Error submitting notification to Airtable:', error);
        throw error;
    }
}
