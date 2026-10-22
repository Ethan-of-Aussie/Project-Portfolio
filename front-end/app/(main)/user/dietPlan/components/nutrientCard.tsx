type NutrientCardProps = {
    item: any;
};

export default function NutrientCard({ item }: NutrientCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">{item.product_name[0].text}</h2>
            {item.nutriments !== null && (
                <>
                    <h3 className="mb-2 text-sm font-semibold text-gray-500">
                        Nutritional Information
                    </h3>
                    <ul className="space-y-2">
                        {item.nutriments.map((nutriment, index) => (
                            <li key={index}
                                className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                                <span>{nutriment.name}</span>
                                <span className="font-medium text-gray-900">
                                    {nutriment["100g"] === null ?
                                        nutriment.value :
                                        nutriment["100g"]}{nutriment.unit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}