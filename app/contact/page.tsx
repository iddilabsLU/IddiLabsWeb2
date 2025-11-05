"use client"

import { useState } from "react"
import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Linkedin, Github, Mail } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (_error) {
      setStatus("error")
      setErrorMessage("Something went wrong — please try again.")
    }
  }

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <SectionHeading centered>Contact</SectionHeading>

        <p className="mb-8 text-center text-lg text-muted-foreground">
          Have an idea, a question, or feedback? IddiLabs welcomes
          conversations and collaboration.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Messages are relayed via Brevo. No database storage.
          </p>

          {status === "success" && (
            <Alert>
              <AlertDescription>
                Message received — reply will follow soon.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send message"}
          </Button>
        </form>

        <div className="mt-12 border-t pt-8">
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Or connect on social media:
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/iddilabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@iddi-labs.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
