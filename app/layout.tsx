import type { Metadata } from "next"
import { Poppins, Lora, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "IddiLabs — Small AI Experiments for Governance",
    template: "%s | IddiLabs",
  },
  description: "Independent AI experiments exploring risk, compliance, and operational innovation in Luxembourg.",
  keywords: ["AI", "Risk Management", "Compliance", "Luxembourg", "Governance", "Risk & Controls"],
  authors: [{ name: "IddiLabs" }],
  creator: "IddiLabs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iddi-labs.com",
    title: "IddiLabs — Small AI Experiments for Governance",
    description: "Independent AI experiments exploring risk, compliance, and operational innovation in Luxembourg.",
    siteName: "IddiLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "IddiLabs — Small AI Experiments for Governance",
    description: "Independent AI experiments exploring risk, compliance, and operational innovation in Luxembourg.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${lora.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
