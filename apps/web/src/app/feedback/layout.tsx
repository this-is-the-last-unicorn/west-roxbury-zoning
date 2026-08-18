import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Feedback',
  description: 'Share your thoughts or report an issue with the West Roxbury zoning analysis.',
}

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
