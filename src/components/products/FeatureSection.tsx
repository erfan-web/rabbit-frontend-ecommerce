import { FeaturesStore } from "../../lib/constants/data";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {FeaturesStore.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
              <feature.icon className="text-xl" />
            </div>
            <h4 className="tracking-tighter mb-2">{feature.title}</h4>
            <div className="text-gray-600 text-sm tracking-tighter">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default FeatureSection;
