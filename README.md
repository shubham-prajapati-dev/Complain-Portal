# Allenhouse Complaint Portal

A modern, responsive complaint management portal for **Allenhouse Group of Institutions**. The project combines an institution landing page with a dedicated complaint submission and tracking flow.

## ✨ Features

- Allenhouse-inspired institutional homepage
- Responsive navigation and mobile menu
- Hero slider with calls to action
- About, Academics, Facilities, Gallery and Admissions sections
- Dedicated **Complaint Portal**
- Complaint categories:
  - College Complaint
  - Hostel Complaint
  - Campus Complaint
- Complaint escalation levels:
  - College Level Complaint
  - HOD Level Complaint
  - Administrator Level Complaint
- Complaint ID generation in the format `CMP-YYYYMMDD-XXXXXXXX`
- Complaint status lookup
- Supabase-backed complaint storage
- Server-side validation through a Vercel API function
- Responsive UI for desktop, tablet and mobile

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- JavaScript (ES Modules)
- CSS

### Backend / API
- Vercel Serverless Functions
- Supabase REST API

### Database
- PostgreSQL through Supabase
- Row Level Security (RLS)

## 📁 Project Structure

```text
Complain-Portal/
├── Compalain Portal/
│   ├── api/
│   │   └── complaints.js
│   ├── public/
│   ├── report/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About/
│   │   │   ├── Academics/
│   │   │   ├── AdmissionBanner/
│   │   │   ├── Facilities/
│   │   │   ├── Footer/
│   │   │   ├── Gallery/
│   │   │   ├── Header/
│   │   │   ├── Hero/
│   │   │   └── Highlights/
│   │   ├── pages/
│   │   │   └── ComplaintManagement/
│   │   ├── complaints.jsx
│   │   └── main.jsx
│   ├── supabase/
│   │   └── schema.sql
│   ├── complaints.html
│   ├── index.html
│   └── package.json
└── README.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/shubham-prajapati-dev/Complain-Portal.git
cd Complain-Portal
```

### 2. Open the application directory

Because the Vite application is inside `Compalain Portal`:

```bash
cd "Compalain Portal"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

The complaint portal is available at:

```text
http://localhost:5173/complaints.html
```

## 🗄️ Supabase Setup

1. Create a project in Supabase.
2. Open the SQL Editor.
3. Run:

```text
Compalain Portal/supabase/schema.sql
```

This creates the `public.complaints` table, indexes and Row Level Security configuration.

### Environment Variables

Configure these variables in your local/server environment:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_server_side_supabase_key
```

**Important:** Never expose the Supabase service-role key in frontend code or commit it to Git.

The API uses the server-side key to insert and retrieve complaint records through Supabase.

## 🔌 API

The complaint API is implemented in:

```text
/api/complaints
```

### Submit a complaint

**POST** `/api/complaints`

Example request:

```json
{
  "category": "College Complaint",
  "level": "HOD Level Complaint",
  "subject": "Example complaint",
  "description": "Detailed description of the issue.",
  "contact": "student@example.com"
}
```

Successful submission returns a generated complaint ID and initial status:

```json
{
  "success": true,
  "complaint": {
    "complaintId": "CMP-YYYYMMDD-XXXXXXXX",
    "status": "Submitted"
  }
}
```

### Track a complaint

**GET** `/api/complaints?id=COMPLAINT_ID`

Example:

```text
/api/complaints?id=CMP-20261008-1234ABCD
```

## ☁️ Vercel Deployment

For deployment, set the Vercel project root to:

```text
Compalain Portal
```

Then configure the required Supabase environment variables in **Vercel → Project Settings → Environment Variables**.

Build command:

```bash
npm run build
```

The Vercel API function is located at:

```text
api/complaints.js
```

## 🔐 Security Notes

- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Do not add public Supabase INSERT or SELECT policies to the complaints table unless the security model is intentionally changed.
- Validate and sanitize user input on the server.
- Use HTTPS in production.
- Use production secrets instead of development credentials.

## 🎯 Complaint Workflow

```text
Complaint Management
        │
        ├── College Complaint
        │     ├── College Level Complaint
        │     ├── HOD Level Complaint
        │     └── Administrator Level Complaint
        │
        ├── Hostel Complaint
        │     ├── College Level Complaint
        │     ├── HOD Level Complaint
        │     └── Administrator Level Complaint
        │
        └── Campus Complaint
              ├── College Level Complaint
              ├── HOD Level Complaint
              └── Administrator Level Complaint
                         │
                         ▼
                  Report & Resolve
```

## 📌 Current Scope

The current project focuses on the institutional website experience and the complaint submission/tracking workflow. Administrative complaint-management dashboards and authentication can be added as future modules.

## 📄 License

This project is intended for educational and institutional project use.

---

Built with **React + Vite + Supabase** for Allenhouse Complaint Portal.
