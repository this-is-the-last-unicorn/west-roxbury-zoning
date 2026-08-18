import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'West Roxbury Zoning Analysis',
    template: '%s | West Roxbury Zoning',
  },
  description:
    "See what Boston's proposed zoning changes mean for your property. Independent civic data — not affiliated with the City.",
  openGraph: {
    title: 'West Roxbury Zoning Analysis',
    description:
      "See what Boston's proposed zoning changes mean for your property. Independent civic data — not affiliated with the City.",
    url: 'https://westroxburyzoning.org',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#0F172A]`}>
        <div className='min-h-screen flex flex-col'>
          <Nav />
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  )
}
