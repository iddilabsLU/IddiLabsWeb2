import { z } from "zod"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Project schema for validation
export const ProjectLinkSchema = z.object({
  type: z.enum(["Demo", "GitHub", "Write-up"]),
  url: z.string().url(),
})

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string().max(160),
  year: z.number(),
  area: z.enum([
    "Risk & Controls",
    "Compliance",
    "Ops",
    "AI/ML",
    "Tools",
  ]),
  tags: z.array(z.string()),
  status: z.enum(["Prototype", "MVP", "Live", "Archived"]),
  links: z.array(ProjectLinkSchema),
  hero: z.string(), // emoji or image path
  role: z.string(),
  stack: z.array(z.string()),
  earlyAccess: z.boolean().optional().default(false),
  waitlistFormId: z.string().optional(),
  body: z.string().optional(),
})

export type Project = z.infer<typeof ProjectSchema>
export type ProjectLink = z.infer<typeof ProjectLinkSchema>

// For listing (without body)
export type ProjectListItem = Omit<Project, "body">

const PROJECTS_DIR = path.join(process.cwd(), "content/projects")

/**
 * Get all projects from MDX files
 */
export async function getAllProjects(): Promise<ProjectListItem[]> {
  try {
    const files = fs.readdirSync(PROJECTS_DIR).filter((file) => file.endsWith(".mdx"))

    const projects = files.map((filename) => {
      const filePath = path.join(PROJECTS_DIR, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      // Validate and parse front matter
      const parsed = ProjectSchema.omit({ body: true }).parse(data)
      return parsed
    })

    // Sort by year (newest first), then by title
    return projects.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year
      return a.title.localeCompare(b.title)
    })
  } catch (error) {
    console.error("Error loading projects:", error)
    return []
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    // Validate and parse
    const parsed = ProjectSchema.parse({
      ...data,
      body: content,
    })

    return parsed
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error)
    return null
  }
}

/**
 * Get unique values for filters
 */
export async function getProjectFilters() {
  const projects = await getAllProjects()

  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a)
  const areas = [...new Set(projects.map((p) => p.area))].sort()
  const statuses = [...new Set(projects.map((p) => p.status))].sort()

  return { years, areas, statuses }
}
