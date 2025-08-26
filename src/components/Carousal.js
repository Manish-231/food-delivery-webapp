// import React from 'react'

// const Carousal = () => {
//   return (
//     <div>
//       <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
//   <div className="carousel-inner">
//     <div className="carousel-item active">
//       <img src="https://foodish-api.herokuapp.com/900×700/?burger" className="d-block w-100" alt="..."/>
//     </div>
//     <div className="carousel-item">
//       <img src="https://foodish-api.herokuapp.com/900×700/?momos" className="d-block w-100" alt="..."/>
//     </div>
//     <div className="carousel-item">
//       <img src="https://foodish-api.herokuapp.com/900×700/?chicken" className="d-block w-100" alt="..."/>
//     </div>
//   </div>
//   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Previous</span>
//   </button>
//   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//     <span className="visually-hidden">Next</span>
//   </button>
// </div>
//     </div>
//   )
// }

// export default Carousal
import React, { useState, useEffect, useMemo } from "react";

const Carousal = () => {
  const allImages = useMemo(
    () => [
      { src: "/images/burger1.jpg", alt: "Burger" },
      { src: "/images/pizza1.jpg", alt: "Pizza" },
      { src: "/images/chicken1.jpg", alt: "Chicken" },
      { src: "/images/salad.jpg", alt: "Salad" },
    ],
    []
  );

  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Shuffle function
  const shuffle = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const shuffled = shuffle(allImages).slice(0, 3);

    // Preload images
    let loadCount = 0;
    shuffled.forEach((img) => {
      const temp = new Image();
      temp.src = img.src;
      temp.onload = () => {
        loadCount++;
        if (loadCount === shuffled.length) setLoaded(true);
      };
    });

    setImages(shuffled);
  }, [allImages]);

  if (!loaded) return <p>Loading images...</p>;

  return (
    <div>
      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={img.src}
                className="d-block w-100"
                alt={img.alt}
                style={{ width: "900px", height: "500px", objectFit: "cover", opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Search bar */}
      <div
        className="carousel-caption d-flex justify-content-center"
        style={{ top: "490px", bottom: "auto" }}
      >
        <form className="d-flex w-75">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Carousal;
