import '../globals.css'
import NavBar from '../components/navBar/navbar'
import BottomNav from '../components/navBar/bottomNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className='pt-16'>
          <main>{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  )
}