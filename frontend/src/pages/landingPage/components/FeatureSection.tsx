import { features } from "./Items.ts";
const FeatureSection = () => {
  return (
    <div className="mt-20 relative border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-blue-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Powerful Features for
          <span className="bg-linear-to-l from-blue-500 to-blue-800 text-transparent bg-clip-text ml-2">
            {" "}
            Your Life Journey
          </span>
        </h2>
      </div>
      <div className="mt-16 flex flex-wrap gap-3 lg:gap-4 justify-center items-center px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-6 border border-neutral-800 rounded-lg"
          >
            <div className="flex items-center mb-4">
              <feature.icon className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl text-neutral-100 font-semibold">
                {feature.title}
              </h3>
            </div>
            <p className="mt-2 text-neutral-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
