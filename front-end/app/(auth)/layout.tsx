import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <h1 className='bg-sky-800 m-3'>auth</h1>
        <main>{children}</main>
      </body>
    </html>
  )
}