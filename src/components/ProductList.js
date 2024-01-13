import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  productsSelector,
  deleteProduct,
  updateProduct,
  setEditProduct,
  clearEditProduct,
  editProductSelector,
} from '../redux/reducers/productReducers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductsList.css';

// Main component for displaying and managing products
const ProductsList = () => {
  const dispatch = useDispatch();
  const latestProducts = useSelector(productsSelector);
  const editProduct = useSelector(editProductSelector);
  const cartItems = useSelector((state) => state.cart);

  // State for edited product and price filter
  const [editedProduct, setEditedProduct] = useState({});
  const [filterByPrice, setFilterByPrice] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle edit button click
  const handleEdit = (product) => {
    dispatch(setEditProduct(product));
    setEditedProduct({ ...product });
  };

  // Handle save edit button click
  const handleSaveEdit = () => {
    dispatch(updateProduct(editedProduct));
    dispatch(clearEditProduct());
    setEditedProduct({});
    toast.success('Product edited successfully');
  };

  // Handle cancel edit button click
  const handleCancelEdit = () => {
    dispatch(clearEditProduct());
    setEditedProduct({});
  };

  // Handle delete button click
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
      toast.success('Product deleted successfully');
    }
  };

  // Handle add to cart button click
  const handleAddToCart = (product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      dispatch(removeFromCart(product.id));
      toast.success('Product removed from cart');
    } else {
      dispatch(addToCart(product));
      toast.success('Product added to cart');
    }
  };

  // Filter products based on the selected price range
  const filteredProducts = filterByPrice
    ? latestProducts.filter((product) => parseFloat(product.price) <= parseFloat(filterByPrice))
    : latestProducts;

  // Render the component
  return (
    <div className="products-list-container">
      {/* Price filter dropdown */}
      <div className="filter-container">
        <label htmlFor="priceFilter">Filter by Price:</label>
        <select
          id="priceFilter"
          value={filterByPrice}
          onChange={(e) => setFilterByPrice(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="500">Under $500</option>
          <option value="800">Under $800</option>
          <option value="1000">Under $1000</option>
        </select>
      </div>

      {/* Product cards */}
      <div className="product-cards">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {/* Product image */}
            <img src={product.image} alt={product.name} />

            {/* Product details or edit form */}
            <div className="product-details">
              {editProduct && editProduct.id === product.id ? (
                <>
                  <input
                    type="text"
                    value={editedProduct.name || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editedProduct.price || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedProduct.image || ''}
                    onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
                  />
                </>
              ) : (
                <>
                  {/* Display product name, price, and add to cart button */}
                  <h3 key={`name-${product.id}`}>{product.name}</h3>
                  <p key={`price-${product.id}`}>${product.price}</p>
                  <button className="cart-button" onClick={() => handleAddToCart(product)}>
                    {cartItems.some((item) => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </>
              )}
            </div>

            {/* Action buttons (Edit, Save, Cancel, Delete) */}
            <div className="action-buttons">
              {editProduct && editProduct.id === product.id ? (
                <>
                  <button className="edit-button" key={`save-${product.id}`} onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button className="delete-button" key={`cancel-${product.id}`} onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-button" key={`edit-${product.id}`} onClick={() => handleEdit(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-button"
                    key={`delete-${product.id}`}
                    onClick={() => handleDelete(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Toast notifications */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default ProductsList;
