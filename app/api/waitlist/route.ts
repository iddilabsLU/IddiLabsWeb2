import { NextResponse } from "next/server"
import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  projectSlug: z.string().min(1, "Project slug is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive updates",
  }),
})

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = waitlistSchema.parse(body)

    // Check if Brevo API key is configured
    const brevoApiKey = process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      // Fallback: return success but log warning
      console.warn(
        "BREVO_API_KEY not configured. Waitlist submission not processed:",
        validatedData
      )
      return NextResponse.json(
        {
          message:
            "Waitlist submission received (Brevo not configured - check server logs)",
        },
        { status: 200 }
      )
    }

    // Add contact to Brevo list
    // Note: You would need to create a list in Brevo for each project
    // and map projectSlug to list IDs
    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          email: validatedData.email,
          attributes: {
            PROJECT: validatedData.projectSlug,
            SUBSCRIBED_AT: new Date().toISOString(),
          },
          updateEnabled: true,
        }),
      }
    )

    if (!brevoResponse.ok) {
      const error = await brevoResponse.text()
      console.error("Brevo API error:", error)
      throw new Error("Failed to add to waitlist via Brevo")
    }

    return NextResponse.json(
      { message: "Added to waitlist successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Waitlist form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Failed to join waitlist. Please try again." },
      { status: 500 }
    )
  }
}
