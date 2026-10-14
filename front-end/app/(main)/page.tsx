import InfoCard from "../components/infocard"

export default function Page() {
  return (
    <>
      {/* Temp layout grid */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="hidden h-40 bg-gray-200 text-center lg:block"
        >
          {i + 1}
        </div>
      ))}

      <div className="col-span-full px-4 text-center sm:px-6 lg:col-span-8 lg:col-start-3">
        <h1 className="text-7xl pt-2 pb-5">DietPlanner</h1>
        <h2 className="text-3xl">Your one stop for diet and plans</h2>
      </div>
      <div className="col-span-full px-4 text-center sm:px-6 lg:col-span-8 lg:col-start-3">
        <div>
          <h3 className="text-2xl pb-4">What We Offer</h3>
        </div>

        {/* Nav links will change depening on page is built or not */}

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" >
            <InfoCard
              title="Nutritional Information"
              description="Learn about calories, protein, and other nutrients in your meals"
              icon="🍎"
              href="/user/nutrition"
            />
            <InfoCard
              title="Diet Planning"
              description="Plan your diet to achieve your goals"
              icon="🥗"
              href="/user/dietPlan" />
            <InfoCard
              title="Calorie Tracking"
              description="Stay informed about your calorie intake with simple tracking"
              icon="📊"
              href="/user/calorie"
            />
            <InfoCard
              title="Custom Plans"
              description="Save your plans and share them with others"
              icon="🎯"
              href="/user/dietPlan"
            />
        </section>
      </div>
    </>
  )
}