import { randomUUID } from 'node:crypto'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

const getEnv = (name) => process.env[name]?.trim()

const supabaseRequest = async (path, options = {}) => {
  const url = getEnv('SUPABASE_URL')
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY')

  if (!url || !key) {
    throw new Error('Supabase environment variables are not configured.')
  }

  return fetch(`${url.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: options.method === 'POST' ? 'return=representation' : 'return=minimal',
      ...(options.headers || {}),
    },
  })
}

const createComplaintId = () => {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `CMP-${date}-${randomUUID().slice(0, 8).toUpperCase()}`
}

export default async function handler(request) {
  try {
    if (request.method === 'POST') {
      const body = await request.json()
      const category = String(body.category || '').trim()
      const level = String(body.level || '').trim()
      const subject = String(body.subject || '').trim()
      const description = String(body.description || '').trim()
      const contact = String(body.contact || '').trim()

      if (!category || !level || !subject || !description || !contact) {
        return json({ success: false, message: 'Please complete all required fields.' }, 400)
      }

      if (subject.length > 180 || description.length > 5000 || contact.length > 120) {
        return json({ success: false, message: 'One or more fields exceed the allowed length.' }, 400)
      }

      const complaintId = createComplaintId()
      const payload = {
        complaint_id: complaintId,
        category,
        level,
        subject,
        description,
        contact,
        status: 'Submitted',
      }

      const response = await supabaseRequest('complaints', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const details = await response.text()
        console.error('Supabase insert failed:', details)
        return json({ success: false, message: 'Unable to save the complaint right now.' }, 502)
      }

      return json({
        success: true,
        complaint: {
          complaintId,
          status: 'Submitted',
        },
      }, 201)
    }

    if (request.method === 'GET') {
      const id = new URL(request.url).searchParams.get('id')?.trim()

      if (!id) {
        return json({ success: false, message: 'Complaint ID is required.' }, 400)
      }

      const response = await supabaseRequest(
        `complaints?select=complaint_id,category,level,subject,status,created_at,resolved_at&complaint_id=eq.${encodeURIComponent(id)}&limit=1`,
        { method: 'GET' },
      )

      if (!response.ok) {
        const details = await response.text()
        console.error('Supabase lookup failed:', details)
        return json({ success: false, message: 'Unable to look up the complaint.' }, 502)
      }

      const rows = await response.json()

      if (!rows.length) {
        return json({ success: false, message: 'Complaint not found.' }, 404)
      }

      return json({ success: true, complaint: rows[0] })
    }

    return json({ success: false, message: 'Method not allowed.' }, 405)
  } catch (error) {
    console.error('Complaint API error:', error)
    return json({ success: false, message: 'Unexpected server error.' }, 500)
  }
}
