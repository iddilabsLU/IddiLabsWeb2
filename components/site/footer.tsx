import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/iddilabs",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:contact@iddi-labs.com",
    icon: Mail,
  },
]

const legalLinks = [
  { name: "Imprint", href: "/legal/imprint" },
  { name: "Privacy", href: "/legal/privacy" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Non-commercial demos by IddiLabs.
            </p>
            <p className="text-sm text-muted-foreground">
              Feedback and collaboration are welcome.
            </p>
          </div>

          <Separator className="w-full max-w-xs" />

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {legalLinks.map((link, index) => (
              <>
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && <span>•</span>}
              </>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IddiLabs
          </p>
        </div>
      </div>
    </footer>
  )
}
