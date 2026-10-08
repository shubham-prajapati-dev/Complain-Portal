# Complaint Management Page

## Real complaint submission

The complaint page now submits to `POST /api/complaints`. The API validates the request, generates a unique complaint ID and stores the complaint in Supabase.

### Required environment variables

Configure these server-side in the deployment environment:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never expose `SUPABASE_SERVICE_ROLE_KEY` in React, Vite client code or browser-exposed variables.

## Database setup

Run `supabase/schema.sql` in the Supabase SQL editor. Row Level Security is enabled and no public table policies are created because database access is performed by the server-side API.

## API

### Submit

`POST /api/complaints`

Request:

```json
{
  "category": "College Complaint",
  "level": "HOD Level Complaint",
  "subject": "Sample subject",
  "description": "Sample complaint description",
  "contact": "Student roll number"
}
```

Response:

```json
{
  "success": true,
  "complaint": {
    "complaintId": "CMP-YYYYMMDD-XXXXXXXX",
    "status": "Submitted"
  }
}
```

### Track

`GET /api/complaints?id=CMP-YYYYMMDD-XXXXXXXX`

The endpoint returns the complaint category, level, subject, status and timestamps.

## Frontend behavior

After successful submission the page displays the generated complaint ID and current status. Failed requests display an error message without losing the selected complaint category/level.

## Flowchart

![Complaint Management Flowchart](./complaint-management-flowchart.svg)
