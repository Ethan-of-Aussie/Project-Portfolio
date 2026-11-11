import healthFoodCloud from "../landingPage/images/healthFoodCloud.webp";
import fruitCloud from "../landingPage/images/fruitCloud.webp";

export default function HeroSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-between md:px-12 lg:px-20">
      <div className="w-full md:w-2/5">
        <img
          src={fruitCloud.src}
          alt="Healthy food"
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-col text-center md:w-1/2 md:text-left">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-700">
          Welcome to DietPlanner
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
          Build healthier habits,
          <span className="block text-green-700">one meal at a time.</span>
        </h1>

        <p className="mx-auto max-w-2xl mb-6 text-base leading-7 text-gray-700 sm:text-lg">
          Understand your nutrition, organise your meals and keep track of your
          daily calorie intake. Take the first step towards a healthier
          lifestyle with DietPlanner.
        </p>
        <a
          href="/user/dietPlan"
          className="self-center inline-block rounded-lg bg-green-700 px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-green-800"
        >
          Explore DietPlanner
        </a>
      </div>
    </section>
  );
}
