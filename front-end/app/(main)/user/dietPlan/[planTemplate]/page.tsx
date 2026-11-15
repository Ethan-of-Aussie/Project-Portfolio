import Button from "@mui/material/Button";
export default function DietPlanDetails() {
  return (
    <div className="mx-auto mt-10 w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Healthy Weight Gain
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Created on 12 November 2026
        </p>

        <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          A balanced selection of foods to support a healthy and nutritious
          diet.
        </p>
      </div>

      <div className="mb-8">
        <div className="w-full max-w-xs rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Foods</p>

          <p className="mt-2 text-3xl font-bold text-green-700">12</p>

          <p className="mt-1 text-sm text-gray-400">Foods in this plan</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Food List</h2>

        <div className="flex flex-col gap-3">
          {[
            {
              name: "Rolled Oats",
              quantity: "100g",
              calories: 389,
              protein: 16.9,
              carbs: 66.3,
              fat: 6.9,
            },
            {
              name: "Chicken Breast",
              quantity: "150g",
              calories: 248,
              protein: 46.4,
              carbs: 0,
              fat: 5.4,
            },
            {
              name: "Avocado",
              quantity: "100g",
              calories: 160,
              protein: 2,
              carbs: 8.5,
              fat: 14.7,
            },
            {
              name: "Greek Yoghurt",
              quantity: "170g",
              calories: 100,
              protein: 17,
              carbs: 6,
              fat: 0.7,
            },
          ].map((food, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{food.name}</h3>
                <span className="text-sm text-gray-500">{food.quantity}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="font-medium text-gray-800">
                    {food.calories} kcal
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="font-medium text-gray-800">{food.protein}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Carbs</p>
                  <p className="font-medium text-gray-800">{food.carbs}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fat</p>
                  <p className="font-medium text-gray-800">{food.fat}g</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Nutrition Summary
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="mt-1 text-2xl font-bold text-green-700">897 kcal</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Protein</p>
              <p className="mt-1 text-2xl font-bold text-green-700">82.3g</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="mt-1 text-2xl font-bold text-green-700">80.8g</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fat</p>
              <p className="mt-1 text-2xl font-bold text-green-700">27.7g</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outlined" color="success">
          Edit Plan
        </Button>

        <Button variant="contained" color="error">
          Delete Plan
        </Button>
      </div>
    </div>
  );
}
