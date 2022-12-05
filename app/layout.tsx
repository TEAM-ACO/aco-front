import '../styles/globals.css'
import Header from './header'
import Footer from './footer'

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
