import '../globals.css'
import NavBar from '../components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className='mx-auto grid max-w-7xl'>
          <main className='grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12'>{children}</main>
        </div>
      </body>
    </html>
  )
}