import Link from "next/link"

type ButtonProps = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

const buttonStyles = `
  w-full rounded-lg bg-green-700 px-4 py-3
  font-semibold text-white transition
  hover:bg-green-800
  focus:outline-none focus:ring-2
  focus:ring-green-600 focus:ring-offset-2
`

const secondaryButtonStyles = `
  w-full rounded-lg bg-gray-200 px-4 py-3
  font-semibold text-gray-800 transition
  hover:bg-gray-300
  focus:outline-none focus:ring-2
  focus:ring-gray-400 focus:ring-offset-2
`

export default function Button({
  children,
  type = "submit",
  href,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles =
  variant === "secondary"
    ? secondaryButtonStyles
    : buttonStyles
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}