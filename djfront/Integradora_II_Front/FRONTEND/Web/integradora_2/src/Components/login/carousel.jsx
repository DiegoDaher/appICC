import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const images = ['/viewIn.jpg', '/viewOut.jpg', '/labWork.jpg'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <figure className="tarjetas">
      {images.map((src, i) => (
        <div
          key={i}
          className={`tarjetas_elemento ${i === index ? 'visible' : ''}`}
        >
          <img src={src} alt={`slide-${i}`} />
        </div>
      ))}
    </figure>
  );
};

export default Carousel;
