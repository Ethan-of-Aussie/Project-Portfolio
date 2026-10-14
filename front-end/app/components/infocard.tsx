type InfoCardProps = {
    title: string
    description: string
    icon: string
    href: string
}

export default function InfoCard({
    title,
    description,
    icon,
    href,
}: InfoCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <p className="mb-4 text-3xl">{icon}</p>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
            <p className="mb-6 text-sm leading-6 text-gray-600">{description}</p>
            <a href="{href}"
                className="font-semibold text-green-700 transition-colors hover:text-green-900"
            >
                Learn More
            </a>
        </div>
    )
}