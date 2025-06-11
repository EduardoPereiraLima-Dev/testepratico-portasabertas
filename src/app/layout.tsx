import type React from "react"
import { Inter } from "next/font/google"
import "../app/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portas Abertas - Authentication",
  description: "Login and Registration System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
