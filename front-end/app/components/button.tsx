
import Link from "next/link"

type ButtonProps = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  href?: string
}

const buttonStyles = `
  w-full rounded-lg bg-green-700 px-4 py-3
  font-semibold text-white transition
  hover:bg-green-800
  focus:outline-none focus:ring-2
  focus:ring-green-600 focus:ring-offset-2
`

export default function Button({
  children,
  type = "submit",
  href,
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={buttonStyles}>
      {children}
    </button>
  )
}