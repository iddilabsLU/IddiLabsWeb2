import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BadgeListProps {
  items: string[]
  className?: string
}

export function BadgeList({ items, className }: BadgeListProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  )
}
