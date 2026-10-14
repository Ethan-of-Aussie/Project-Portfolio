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
  font-semibold text-white
  transition-all duration-200 ease-in-out
  hover:bg-green-800 hover:shadow-md
  active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-green-600 focus-visible:ring-offset-2
`

const secondaryButtonStyles = `
  w-full rounded-lg bg-gray-200 px-4 py-3
  font-semibold text-gray-800
  transition-all duration-200 ease-in-out
  hover:bg-gray-300 hover:shadow-sm
  active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-gray-400 focus-visible:ring-offset-2
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