import { Section } from "@/components/site/section"
import { SectionHeading } from "@/components/site/section-heading"
import { ProjectCard } from "@/components/cards/project-card"
import { ProjectFilters } from "@/components/projects/project-filters"
import { getAllProjects, getProjectFilters } from "@/lib/projects"

export const dynamic = "force-dynamic"
export const runtime = "edge"

export const metadata = {
  title: "Projects",
  description:
    "Discover experiments that turn governance challenges into simple, transparent AI workflows.",
}

interface ProjectsPageProps {
  searchParams: Promise<{
    year?: string
    area?: string
    status?: string
    search?: string
  }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const allProjects = await getAllProjects()
  const filters = await getProjectFilters()

  // Apply filters
  let filteredProjects = allProjects

  if (params.year && params.year !== "all") {
    filteredProjects = filteredProjects.filter(
      (p) => p.year.toString() === params.year
    )
  }

  if (params.area && params.area !== "all") {
    filteredProjects = filteredProjects.filter((p) => p.area === params.area)
  }

  if (params.status && params.status !== "all") {
    filteredProjects = filteredProjects.filter((p) => p.status === params.status)
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.summary.toLowerCase().includes(searchLower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  }

  return (
    <Section>
      <SectionHeading
        subtitle="Practical AI experiments for governance and operations — small tools, simple goals, transparent methods."
      >
        Projects
      </SectionHeading>

      <ProjectFilters
        years={filters.years}
        areas={filters.areas}
        statuses={filters.statuses}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            No projects match your filters.
          </p>
        </div>
      )}
    </Section>
  )
}
