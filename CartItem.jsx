import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <p>Total Items: {totalItems}</p>
      <h2>Total Cost: ${totalCartAmount.toFixed(2)}</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <div className="cart-details">
                <h3>{item.name}</h3>

                <p>Unit Price: ${item.price}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Total: ${itemTotal.toFixed(2)}
                </p>

                <button
                  onClick={() => increaseQuantity(item)}
                >
                  +
                </button>

                <button
                  onClick={() => decreaseQuantity(item)}
                >
                  -
                </button>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}

      <div className="cart-actions">
        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>

        <button>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
