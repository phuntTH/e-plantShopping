import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../redux/CartSlice";
import "./ProductList.css";

const plants = [
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 25,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400",
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Indoor Plants",
    price: 30,
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d38fe1a?w=400",
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Succulents",
    price: 18,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400",
  },
  {
    id: 4,
    name: "Cactus",
    category: "Succulents",
    price: 20,
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400",
  },
  {
    id: 5,
    name: "Lavender",
    category: "Flowering Plants",
    price: 22,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400",
  },
  {
    id: 6,
    name: "Rose",
    category: "Flowering Plants",
    price: 28,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400",
  },
];

function ProductList() {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {

    dispatch(addItem(plant));

    setAddedItems({
      ...addedItems,
      [plant.id]: true,
    });

  };

  const groupedPlants = plants.reduce((groups, plant) => {

    if (!groups[plant.category]) {

      groups[plant.category] = [];

    }

    groups[plant.category].push(plant);

    return groups;

  }, {});

  return (

    <div className="product-page">

      <header className="navbar">

        <h1>Paradise Nursery</h1>

        <Link to="/cart" className="cart-link">

          🛒 Cart ({cartItems.length})

        </Link>

      </header>

      {Object.keys(groupedPlants).map((category) => (

        <div key={category} className="category">

          <h2>{category}</h2>

          <div className="products">

            {groupedPlants[category].map((plant) => (

              <div key={plant.id} className="product-card">

                <img
                  src={plant.image}
                  alt={plant.name}
                />

                <h3>{plant.name}</h3>

                <p>${plant.price}</p>

                <button

                  disabled={addedItems[plant.id]}

                  onClick={() => handleAddToCart(plant)}

                >

                  {addedItems[plant.id]

                    ? "Added to Cart"

                    : "Add to Cart"}

                </button>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>

  );

}

export default ProductList;
