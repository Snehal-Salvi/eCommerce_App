import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, cartSelector } from '../redux/reducers/cartReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartPage() {
 
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);

  // Handler for removing items from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Product removed from cart');
  };

  // Calculate the total number of items in the cart
  const getTotalItemsCount = () => {
    return cartItems.length;
  };

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-page-container">
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className="remove-from-cart-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1">Total Items:</td>
              <td>{getTotalItemsCount()}</td>
              <td colSpan="1">Total Price:</td>
              <td>${getTotalPrice()}</td>
            </tr>
          </tfoot>
        </table>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default CartPage;
