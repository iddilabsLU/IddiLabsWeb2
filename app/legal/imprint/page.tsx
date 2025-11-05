import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export const metadata = {
  title: "Imprint",
  description: "Legal information about IddiLabs.",
}

export default function ImprintPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <SectionHeading>Imprint</SectionHeading>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Operator
              </h3>
              <p>IddiLabs</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Contact
              </h3>
              <p>
                <a
                  href="mailto:contact@iddi-labs.com"
                  className="text-primary hover:underline"
                >
                  contact@iddi-labs.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Purpose
              </h3>
              <p>
                Non-commercial experimental website showcasing AI-driven tools
                for compliance and operations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Location
              </h3>
              <p>Luxembourg</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Disclaimer
              </h3>
              <p>
                This website provides demonstrations and informational content
                only. No commercial or consulting activity is offered.
              </p>
              <p>
                All projects are provided as-is for educational and
                demonstration purposes. While we strive for accuracy, IddiLabs
                makes no warranties regarding the completeness, reliability, or
                suitability of any tools or information presented.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Intellectual Property
              </h3>
              <p>
                Unless otherwise stated, all content on this website is the
                property of IddiLabs. Open-source projects are licensed as
                indicated in their respective repositories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
