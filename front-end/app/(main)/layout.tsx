import '../globals.css'
import NavBar from '../components/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='mx-8'>
        <NavBar />
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}