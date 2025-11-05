import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProjectListItem } from "@/lib/projects"

interface ProjectCardProps {
  project: ProjectListItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const demoLink = project.links.find((l) => l.type === "Demo")
  const githubLink = project.links.find((l) => l.type === "GitHub")

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-border/40 transition-all hover:border-border hover:shadow-md">
      {/* Hero/Emoji */}
      <div className="flex h-32 items-center justify-center bg-muted/30 text-6xl">
        {project.hero}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight text-foreground">
            {project.title}
          </h3>
          <Badge variant="outline" className="shrink-0 text-xs">
            {project.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/projects/${project.slug}`}>View Project</Link>
          </Button>

          <div className="flex gap-1">
            {githubLink && (
              <Button asChild variant="outline" size="icon">
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {demoLink && (
              <Button asChild variant="outline" size="icon">
                <a
                  href={demoLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {project.earlyAccess && (
          <div className="mt-2 rounded-md bg-accent/10 px-3 py-2 text-center">
            <p className="text-xs text-muted-foreground">
              Early access available — join the waitlist
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
