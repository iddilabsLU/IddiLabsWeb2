import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: React.ReactNode
  subtitle?: string
  className?: string
  centered?: boolean
}

export function SectionHeading({
  children,
  subtitle,
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
