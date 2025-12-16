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
            };
        });

        // Filter for "6 Guitars" shows only
        const sixGuitarsShows = allShows.filter(
            (show) => show.showName?.trim().toLowerCase() === '6 guitars'
        );
        console.log(`📊 6 Guitars shows: ${sixGuitarsShows.length}`);

        // Filter out past shows - only show today and future
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingShows = sixGuitarsShows.filter((show) => {
            if (!show.date) return false;
            const showDate = new Date(show.date);
            showDate.setHours(0, 0, 0, 0);
            return showDate >= today;
        });
        console.log(`📊 Upcoming shows: ${upcomingShows.length}`);

        // Sort by date, then venue, then time
        upcomingShows.sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date);
            }
            if (a.venue !== b.venue) {
                return (a.venue || '').localeCompare(b.venue || '');
            }
            return parseTime(a.time) - parseTime(b.time);
        });

        // Group shows by date + venue
        const groupedShows = groupShowsByDateAndVenue(upcomingShows);
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
