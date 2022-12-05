import '../styles/globals.css'
import Header from './header'
import Footer from './footer'

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
