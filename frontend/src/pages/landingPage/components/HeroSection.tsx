import HeroVideo from '../../../assets/videos/HeroVideo.mp4';
import HeroVideo2 from '../../../assets/videos/HeroVideo2.mp4';
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Welcome to{" "}
        <span className="bg-linear-to-bl from-blue-500 to-blue-800 text-transparent bg-clip-text">
          Debre Selam
        </span>
      </h1>

      <p className="mt-10 text-lg sm:text-xl lg:text-2xl text-center text-gray-500 max-w-3xl">
        Rooted in centuries of sacred tradition and timeless wisdom. A digital
        sanctuary designed to nourish your soul and guide your spirit. Discover
        the beauty of faith through modern connection and ancient truth.
      </p>
      <div className="mt-10 flex gap-8 items-center">
        <a
          href="#explore"
          className="text-[#C5A059] border-b border-[#C5A059] pb-1 hover:text-white hover:border-white transition"
        >
          Explore Sacred Teachings →
        </a>
        <a href="#about" className="text-gray-400 hover:text-white transition">
          Our Story
        </a>
      </div>
      <div className="flex mt-10 p-4 justify-center">
        <video
          className="rounded-lg w-1/2  shadow-orange-400 mx-2 my-4"
          autoPlay
          loop
          muted
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          className="rounded-lg w-1/2  shadow-orange-400 mx-2 my-4"
          autoPlay
          loop
          muted
        >
          <source src={HeroVideo2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
