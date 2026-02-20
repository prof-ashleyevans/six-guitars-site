# Fallback Tour Dates (Airtable outage)

When Airtable is down or returns no shows, the site uses `tour-dates-fallback.json` so tour dates and ticket links still work.

## How to edit

1. Open **`data/tour-dates-fallback.json`**.
2. Replace the example entry with your real tour dates.
3. Use the same structure for each show (see below). Past dates are automatically hidden.

## One show per date/venue (single performance)

```json
{
  "groupKey": "2025-03-15|Venue Name",
  "date": "2025-03-15",
  "day": "Saturday",
  "venue": "Venue Name",
  "location": "City State",
  "performances": [
    {
      "id": "unique-id-1",
      "time": "7:30 PM",
      "fullBand": false,
      "ticketAvail": "available",
      "ticketLink": "https://your-ticket-url.com",
      "onSaleDate": "",
      "discountCode": "",
      "discountPercentage": ""
    }
  ]
}
```

## Same date/venue, multiple show times (e.g. matinee + evening)

Add multiple objects to `performances`:

```json
{
  "groupKey": "2025-03-15|Venue Name",
  "date": "2025-03-15",
  "day": "Saturday",
  "venue": "Venue Name",
  "location": "City State",
  "performances": [
    { "id": "1", "time": "2:00 PM", "fullBand": false, "ticketAvail": "available", "ticketLink": "https://...", "onSaleDate": "", "discountCode": "", "discountPercentage": "" },
    { "id": "2", "time": "7:30 PM", "fullBand": true, "ticketAvail": "available", "ticketLink": "https://...", "onSaleDate": "", "discountCode": "", "discountPercentage": "" }
  ]
}
```

## Field reference

| Field | Description |
|-------|-------------|
| **groupKey** | `date\|venue` (e.g. `2025-03-15|Theater Name`) – must be unique per date+venue |
| **date** | `YYYY-MM-DD` |
| **day** | e.g. `Saturday` (optional; used for display) |
| **venue** | Venue name |
| **location** | e.g. `Austin TX` or `City State` (displayed as “City, State”) |
| **performances** | Array of show times (see below) |

Each **performance** object:

| Field | Description |
|-------|-------------|
| **id** | Any unique string (e.g. `fallback-1`) |
| **time** | e.g. `7:30 PM` |
| **fullBand** | `true` or `false` (shows ⭐ on the site) |
| **ticketAvail** | `available`, `coming soon`, `limited avail`, `going fast`, `sold out`, or `notify me` |
| **ticketLink** | Full URL (e.g. `https://...)` |
| **onSaleDate** | Optional |
| **discountCode** | Optional (e.g. `GUITAR10`) |
| **discountPercentage** | Optional (e.g. `10`) |

When Airtable is back online, the site will use Airtable again automatically; you can leave this file in place for future outages.

---

## Critic reviews fallback

When Airtable is down or returns no critic reviews, the site uses **`data/reviews-fallback.json`**. Each object needs: `id`, `name`, `quote`, `status` (use `5` to show 5 stars), and `logo` (path like `/images/edmonton-sun-logo.jpg`). When Airtable is working again, the API will serve from Airtable automatically—no code change needed.
