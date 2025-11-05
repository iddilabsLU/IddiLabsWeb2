import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"
import { FeatureCard } from "@/components/cards/feature-card"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export const metadata = {
  title: "About",
  description: "Learn how IddiLabs explores AI's role in compliance and operations.",
}

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Abstract Geometric Motif */}
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-64 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 lg:h-80 lg:w-80">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
                <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-secondary/10 blur-xl" />
              </div>
            </div>

            {/* About Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-foreground">
                About IddiLabs
              </h1>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  IddiLabs is an independent initiative exploring how AI can
                  simplify compliance, risk, and operational work.
                </p>
                <p>
                  Each project tests a small, real-world idea — built without
                  commercial intent, for learning and transparency.
                </p>
                <p>Every tool emphasizes privacy, clarity, and accessibility.</p>
                <p>
                  Based in Luxembourg, IddiLabs experiments with ways to make
                  governance more efficient and human-friendly.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Principles
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <FeatureCard
                title="Privacy-first"
                description="Transparent by design, with minimal data collection and clear user control."
              />
              <FeatureCard
                title="Small & Testable"
                description="Simple tools over complex systems — focused solutions for specific problems."
              />
              <FeatureCard
                title="Open Knowledge"
                description="Shared openly whenever possible, contributing to collective learning."
              />
            </div>
          </div>

          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Values
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Learning in public:</strong>{" "}
                Every experiment is shared openly — results, lessons, and even
                mistakes are part of the process.
              </p>
              <p>
                <strong className="text-foreground">Real problems:</strong>{" "}
                Projects start from everyday inefficiencies in governance,
                reporting, and compliance work.
              </p>
              <p>
                <strong className="text-foreground">Non-commercial:</strong> All
                tools are built for learning and demonstration, not for profit.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg italic text-muted-foreground">
              Ideas become tools, and tools become learning.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
