import { useState } from "react";
import FamilysGate from "./UI";

const B_likawnt = [
  {
    src: "/src/assets/F_Img/s_Policarpes.png",
    family: "ቤተ ቅዱስ ፖሊካርፐስ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Baslios.png",
    family: "ቤተ ቅዱስ ባስሊዎስ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Atnatewos.png",
    family: "ቤተ ቅዱስ አትናቴዎስ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Giorgis_zegascha.png",
    family: "ቤተ አባ ጊዎርጊስ ዘጋስጫ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Gorgorios.png",
    family: "ቤተ ቅዱስ ጎርጎሬዎስ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Yaried.png",
    family: "ቤተ ቅዱስ ያሬድ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_Yaekob_zesrug.jpg",
    family: "ቤተ ቅዱስ ያዕቆብ ዘስሩግ",
    grand_family: "ቤተ ሊቃውንት",
  },
  {
    src: "/src/assets/F_Img/s_yohans_afewerk.png",
    family: "ቤተ ቅዱስ ዮሀንስ አፈወርቅ",
    grand_family: "ቤተ ሊቃውንት",
  },
];

const Gates = () => {
  const [active, setActive] = useState<number | null>(null);
  // console.log(active);

  const toggle = (i: number) => {
    setActive((prev) => (prev === i ? null : i));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            እንኳን ወደ ቤተ ሊቃውንት በደህና መጡ !!!
          </h1>
          <p className="text-gray-600 italic">
            "The Gates of Wisdom Are Now Open"
          </p>
        </div>

        {/* Grid of Family Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {B_likawnt.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggle(index)}
                className={`w-full overflow-hidden rounded-lg border ${
                  active === index
                    ? "border-blue-500 shadow-md"
                    : "border-gray-300"
                } bg-black hover:shadow-lg transition-shadow`}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.family}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* family */}
                <div className="p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-800 text-center">
                    {item.family}
                  </p>

                  {/* Active Indicator */}
                  <div
                    className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                      active === index ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center p-6 rounded-lg bg-gray-50 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            የጥበብ በሮች ይክፈቱ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each gate represents a path to spiritual wisdom and knowledge. Click
            on any gate to explore deeper teachings and connect with divine
            guidance.
          </p>
        </div>
      </div>

      {/* Modal for Selected Family */}
      {active !== null && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setActive(null)}
          />

          {/* Modal */}
          <div className="fixed inset-4 md:inset-20 z-50 overflow-hidden">
            <div className="relative h-full bg-white rounded-lg overflow-hidden border border-gray-300 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200"
              >
                ×
              </button>

              {/* Modal Content */}
              <div className="h-full overflow-y-auto">
                <FamilysGate
                  src={B_likawnt[active].src}
                  Family={B_likawnt[active].family}
                  GrandFamily={B_likawnt[active].grand_family}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gates;
