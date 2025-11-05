import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"
import { BadgeList } from "@/components/site/badge-list"
import { FeatureCard } from "@/components/cards/feature-card"
import { ProjectCard } from "@/components/cards/project-card"
import { AnimatedBackground } from "@/components/shared/animated-background"
import { getAllProjects } from "@/lib/projects"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export default async function HomePage() {
  const projects = await getAllProjects()
  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden py-24 md:py-32" container={false}>
        <AnimatedBackground />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Risk & AI, working together.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              IddiLabs builds small, practical AI tools for compliance, operations, and everyday workflows.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">Explore Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
            <BadgeList
              items={["AI", "Risk & Controls", "Luxembourg"]}
              className="mt-8"
            />
            <p className="mt-6 text-sm text-muted-foreground">
              Non-commercial demos built for learning.
            </p>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
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
            <h2 className="text-3xl font-bold text-foreground">About IddiLabs</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                IddiLabs is an independent initiative exploring how AI can simplify compliance, risk, and operational work.
              </p>
              <p>
                Each project tests a small, real-world idea — built without commercial intent, for learning and transparency.
              </p>
              <p>
                Every tool emphasizes privacy, clarity, and accessibility.
              </p>
              <p>
                Based in Luxembourg, IddiLabs experiments with ways to make governance more efficient and human-friendly.
              </p>
            </div>
            <div className="mt-8 space-y-2 text-sm">
              <p className="font-semibold text-foreground">Principles:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Privacy-first, transparent by design</li>
                <li>• Small, testable tools over complex systems</li>
                <li>• Knowledge shared openly whenever possible</li>
              </ul>
            </div>
            <p className="mt-6 italic text-muted-foreground">
              Ideas become tools, and tools become learning.
            </p>
          </div>
        </div>
      </Section>

      {/* Why IddiLabs Section */}
      <Section className="bg-muted/30">
        <SectionHeading centered>Why IddiLabs</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Learning in public"
            description="Every experiment is shared openly — results, lessons, and even mistakes are part of the process."
          />
          <FeatureCard
            title="Privacy-first demos"
            description="Tools are designed to run locally or with minimal data sharing."
          />
          <FeatureCard
            title="Real problems"
            description="Projects start from everyday inefficiencies in governance, reporting, and compliance work."
          />
          <FeatureCard
            title="Open when possible"
            description="Source code and datasets are shared when licensing and context allow."
          />
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section id="projects">
        <SectionHeading
          subtitle="Practical AI experiments for governance and operations — small tools, simple goals, transparent methods."
        >
          Projects
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </Section>

      {/* Contact CTA Section */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Have an idea or question?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            IddiLabs welcomes conversations and collaboration.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
