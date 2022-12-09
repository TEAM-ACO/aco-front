import { Flowbite, DarkThemeToggle } from 'flowbite-react'

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="sticky top-0 z-50">
      {children}
      {/* <Footer /> */}
    </div>
  )
}
