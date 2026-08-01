import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeItem,
  updateQuantity,
} from "../redux/CartSlice";

function CartItem() {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const increaseQuantity = (item) => {

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );

  };

  const decreaseQuantity = (item) => {

    if (item.quantity > 1) {

      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );

    } else {

      dispatch(removeItem(item.id));

    }

  };

  const handleRemove = (id) => {

    dispatch(removeItem(id));

  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (

    <div className="cart-page">

      <header className="cart-header">

        <h1>Shopping Cart</h1>

        <Link to="/products">

          Continue Shopping

        </Link>

      </header>

      <div className="cart-summary">

        <h2>Total Items: {totalItems}</h2>

        <h2>
          Total Cost: ${totalCost.toFixed(2)}
        </h2>

      </div>

      {cartItems.length === 0 ? (

        <h3>Your cart is empty.</h3>

      ) : (

        <div className="cart-container">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <div className="cart-details">

                <h3>{item.name}</h3>

                <p>
                  Price: ${item.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  Total: $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    handleRemove(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      <div className="checkout-section">

        <button>

          Checkout

        </button>

      </div>

    </div>

  );

}

export default CartItem;
