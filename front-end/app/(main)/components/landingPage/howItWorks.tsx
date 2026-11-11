import InfoCard from "../../../components/infocard";

export default function HowItWorksSection() {
  return (
    <section className="col-span-full mx-auto px-6 pb-12 lg:col-span-10 lg:col-start-2">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-700">
          How It Works:
        </p>
        <h2 className="text-3xl font-bold text-gray-900">
          Get started in three simple steps
        </h2>
      </div>

      <div className="flex w-full flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:px-12 lg:px-20">
        <InfoCard
          title="Explore"
          description="Browse through nutritional information about different food directly from our source."
        />

        <InfoCard
          title="Create"
          description="Find what you like. Start creating your own plans"
        />

        <InfoCard
          title="Track"
          description="Track nutritional information about different foods as you search."
        />
      </div>
    </section>
  );
}
