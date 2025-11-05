import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/site/section"
import { BadgeList } from "@/components/site/badge-list"
import { getProjectBySlug, getAllProjects } from "@/lib/projects"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"
export const runtime = "edge"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const demoLink = project.links.find((l) => l.type === "Demo")
  const githubLink = project.links.find((l) => l.type === "GitHub")
  const writeupLink = project.links.find((l) => l.type === "Write-up")

  return (
    <>
      <Section>
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Project Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 text-6xl">{project.hero}</div>
            <h1 className="text-4xl font-bold text-foreground">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Badge variant="outline">{project.status}</Badge>
              <Badge variant="secondary">{project.area}</Badge>
              <span className="text-sm text-muted-foreground">
                {project.year}
              </span>
            </div>
            <BadgeList items={project.tags} className="mt-6 justify-center" />
          </div>

          {/* Links */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {demoLink && (
              <Button asChild>
                <a
                  href={demoLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </a>
              </Button>
            )}
            {githubLink && (
              <Button asChild variant="outline">
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}
            {writeupLink && (
              <Button asChild variant="outline">
                <a
                  href={writeupLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Write-up
                </a>
              </Button>
            )}
          </div>

          <Separator className="my-12" />

          {/* Project Body */}
          <div className="prose prose-gray dark:prose-invert mx-auto max-w-none">
            {project.body && (
              <div className="whitespace-pre-wrap text-foreground">
                {project.body}
              </div>
            )}
          </div>

          <Separator className="my-12" />

          {/* Project Metadata */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Role
              </h3>
              <p className="text-muted-foreground">{project.role}</p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Stack
              </h3>
              <BadgeList items={project.stack} />
            </div>
          </div>

          {/* Early Access CTA */}
          {project.earlyAccess && project.waitlistFormId && (
            <div className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground">
                Early Access
              </h3>
              <p className="mt-2 text-muted-foreground">
                Join the waiting list to try this tool before release.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/contact">Join Waitlist</Link>
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
