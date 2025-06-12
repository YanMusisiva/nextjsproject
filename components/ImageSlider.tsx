import { useState, useEffect } from "react";

// List your image filenames here if uploading manually to /public/uploads
const manualImages = [
  "/uploads/image1.jpg",
  "/uploads/image2.jpg",
  "/uploads/image3.jpg",
  // Add more image paths as needed
];

const ImageSlider = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Since images are manually uploaded, just set them directly
    setImages(manualImages);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="inline-block w-1/3"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
