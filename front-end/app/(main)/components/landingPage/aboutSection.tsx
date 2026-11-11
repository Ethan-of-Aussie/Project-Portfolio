import healthFoodHeart from "../landingPage/images/healthFoodHeart.webp";

export default function AboutSection() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-6 py-16 md:flex-row md:px-12 lg:px-20">
      {/* Text */}
      <div className="flex flex-col text-center md:w-1/2 md:text-left">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-700">
          About DietPlanner
        </p>

        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          More than just meal planning.
        </h2>

        <p className="text-base leading-7 text-gray-600 sm:text-lg">
          DietPlanner helps you make more informed decisions about your daily
          nutrition. Explore food nutritional information, create personalised
          diet plans and keep track of your calorie intake, all in one place.
        </p>
      </div>

      {/* Image */}
      <div className="w-full md:w-2/5">
        <img
          src={healthFoodHeart.src}
          alt="Healthy food"
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
