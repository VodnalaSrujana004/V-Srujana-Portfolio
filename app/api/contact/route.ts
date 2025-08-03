import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, timestamp } = body

    console.log("📊 Received form data:", { name, email, subject })

    // Google Sheets Web App URL - you'll replace this with your actual URL
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || 'https://script.google.com/home/projects/1pkvwiNL9YGcgI-HG9iLsH81IyS_oIn6LCWv9srQ4kau3whMTZH1eW_Iy/edit'

    if (GOOGLE_SHEETS_URL === 'https://script.google.com/home/projects/1pkvwiNL9YGcgI-HG9iLsH81IyS_oIn6LCWv9srQ4kau3whMTZH1eW_Iy/edit') {
      console.log("⚠️ Google Sheets URL not configured yet")
      throw new Error('Google Sheets not configured')
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        timestamp,
      }),
    })

    if (response.ok) {
      console.log("✅ Successfully saved to Google Sheets")
      return NextResponse.json({ success: true })
    } else {
      console.error("❌ Google Sheets API error:", response.status)
      throw new Error('Failed to save to Google Sheets')
    }
  } catch (error) {
    console.error('❌ Error saving to Google Sheets:', error)
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}