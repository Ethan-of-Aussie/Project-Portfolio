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
        <h1 className='bg-sky-800 m-3'>Title</h1>
        <div className='mx-auto grid px-4'>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}