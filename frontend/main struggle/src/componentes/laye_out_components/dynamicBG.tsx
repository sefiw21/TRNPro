import { useEffect, useState } from "react";

interface DynamicBgProps {
  images: string[];        // Array of image URLs
  interval?: number;       // Interval in milliseconds (default 3000)
  className?: string;      // Additional Tailwind classes
}

const DynamicBackground: React.FC<DynamicBgProps> = ({
  images,
  interval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, interval]);

  return (
    <div className={`w-full h-64 overflow-hidden ${className}`}>
      {images.map((img, index) => {
        const isCurrent = index === currentIndex;
        const isPrev = index === prevIndex;

        return (
          <img
            key={index}
            src={img}
            alt={`background-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 
              ${isCurrent ? "opacity-100" : ""}
              ${isPrev && !isCurrent ? "opacity-0" : ""}
              ${!isCurrent && !isPrev ? "opacity-0" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default DynamicBackground;
