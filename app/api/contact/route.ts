import { NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Check if Brevo API key is configured
    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoToEmail = process.env.BREVO_TO_EMAIL || "contact@iddi-labs.com"
    const brevoFromEmail =
      process.env.BREVO_FROM_EMAIL || "noreply@iddi-labs.com"

    if (!brevoApiKey) {
      // Fallback: return success but log warning
      console.warn(
        "BREVO_API_KEY not configured. Email not sent:",
        validatedData
      )
      return NextResponse.json(
        {
          message:
            "Contact form submitted (Brevo not configured - check server logs)",
        },
        { status: 200 }
      )
    }

    // Send email via Brevo API
    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: {
            name: validatedData.name,
            email: brevoFromEmail,
          },
          to: [
            {
              email: brevoToEmail,
            },
          ],
          replyTo: {
            email: validatedData.email,
            name: validatedData.name,
          },
          subject: `Contact Form: Message from ${validatedData.name}`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      }
    )

    if (!brevoResponse.ok) {
      const error = await brevoResponse.text()
      console.error("Brevo API error:", error)
      throw new Error("Failed to send email via Brevo")
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
