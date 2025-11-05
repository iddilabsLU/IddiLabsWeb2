"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

interface ProjectFiltersProps {
  years: number[]
  areas: string[]
  statuses: string[]
}

export function ProjectFilters({ years, areas, statuses }: ProjectFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/projects?${params.toString()}`)
  }

  const currentYear = searchParams.get("year") || "all"
  const currentArea = searchParams.get("area") || "all"
  const currentStatus = searchParams.get("status") || "all"
  const currentSearch = searchParams.get("search") || ""

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          defaultValue={currentSearch}
          onChange={(e) => {
            const timer = setTimeout(() => {
              updateFilter("search", e.target.value)
            }, 300)
            return () => clearTimeout(timer)
          }}
        />
      </div>

      <Select value={currentYear} onValueChange={(value) => updateFilter("year", value)}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentArea} onValueChange={(value) => updateFilter("area", value)}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Area" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Areas</SelectItem>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentStatus} onValueChange={(value) => updateFilter("status", value)}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
