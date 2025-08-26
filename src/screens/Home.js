import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {
  const allImages = useMemo(
    () => [
      { src: "/images/burger1.jpg", alt: "Burger" },
      { src: "/images/pizza1.jpg", alt: "Pizza" },
      { src: "/images/chicken1.jpg", alt: "Chicken" },
      { src: "/images/salad.jpg", alt: "Salad" },
    ],
    []
  )

  // ✅ Corrected initial state
  const [search, setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json()
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />

      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {allImages.map((img, index) => (
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

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Search bar inside carousel */}
        <div className="carousel-caption d-flex justify-content-center" style={{ top: "380px", bottom: "auto" }}>
          <div className="d-flex justify-content-center w-75">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Food categories */}
      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className='mb-4'>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              <div className='row'>
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-3'>
                        <Card foodItem={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div>No such Data found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          ""
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Home
