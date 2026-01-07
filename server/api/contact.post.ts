import type { H3Event } from 'h3'

type ContactMessageInput = {
  full_name: string
  email: string
  phone: string
  subject: string
  message: string
}

const API_BASE_URL = 'http://156.236.31.140:8001'

const handler = async (event: H3Event) => {
  const body = await readBody<ContactMessageInput>(event)
  const res = await fetch(`${API_BASE_URL}/api/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body ?? {})
  })

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: `Contact API request failed (${res.status})`
    })
  }

  return await res.json() as ContactMessageInput
}

export default defineEventHandler(handler)
