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

      <div className="lg:col-start-3 lg:col-span-8 text-center">
        <h1 className="text-7xl pt-2 pb-5">DietPlanner</h1>
        <h2 className="text-2xl">Your one stop for diet and plans</h2>
      </div>
    </>
  )
}