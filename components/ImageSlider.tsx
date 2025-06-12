import { useState, useEffect } from "react";

const ImageSlider = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const data = await response.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index}`}
          className="inline-block w-1/3"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
