import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for IddiLabs website.",
}

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Privacy Policy</SectionHeading>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              IddiLabs is committed to protecting your privacy. This policy
              explains how we handle data on this website.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                No Cookies or Tracking
              </h3>
              <p>
                IddiLabs does not use cookies or tracking scripts. We do not
                collect personal information through browser storage or
                third-party analytics that require consent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Anonymous Analytics
              </h3>
              <p>
                Anonymous visit statistics are collected via Cloudflare or
                Vercel Analytics. These services provide aggregate data (page
                views, geographic regions, referrers) without identifying
                individual users.
              </p>
              <p>
                No personal data, IP addresses, or unique identifiers are
                stored or shared.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Contact Form & Waitlists
              </h3>
              <p>
                When you submit a contact form or join a project waitlist, your
                data (name, email, message) is processed through Brevo, a
                third-party email service.
              </p>
              <p>
                <strong>Data collected:</strong> Name, email address, message
                content, project interest (for waitlists), timestamp
              </p>
              <p>
                <strong>Purpose:</strong> To respond to inquiries and notify
                you about project launches
              </p>
              <p>
                <strong>Storage:</strong> No local database storage — all
                submissions are handled by Brevo
              </p>
              <p>
                <strong>Retention:</strong> Data is kept until you request
                deletion or unsubscribe
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Third-Party Services
              </h3>
              <p>This website uses the following external services:</p>
              <ul className="list-disc pl-6">
                <li>
                  <strong>Brevo</strong> — Email processing for contact forms
                  and waitlists
                </li>
                <li>
                  <strong>Vercel/Cloudflare</strong> — Hosting and anonymous
                  analytics
                </li>
              </ul>
              <p>
                These services have their own privacy policies and data
                handling practices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Your Rights
              </h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Request a copy of data we hold about you</li>
                <li>Request deletion of your data</li>
                <li>Opt out of waitlist communications at any time</li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:contact@iddi-labs.com"
                  className="text-primary hover:underline"
                >
                  contact@iddi-labs.com
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Data Security
              </h3>
              <p>
                All data transmission is encrypted via HTTPS. Submissions are
                processed server-side to prevent client-side data exposure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Changes to This Policy
              </h3>
              <p>
                This privacy policy may be updated to reflect changes in our
                practices or legal requirements. We will indicate the last
                update date at the bottom of this page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Contact
              </h3>
              <p>
                For any privacy inquiry, contact{" "}
                <a
                  href="mailto:contact@iddi-labs.com"
                  className="text-primary hover:underline"
                >
                  contact@iddi-labs.com
                </a>
                .
              </p>
            </div>

            <p className="mt-8 text-sm">
              <strong>Last updated:</strong> January 2025
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
