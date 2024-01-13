import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector } from '../redux/reducers/productReducers';
import { fetchProducts, updateProduct, deleteProduct } from '../redux/reducers/productReducers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ProductsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToCart, removeFromCart } from '../redux/reducers/cartReducer';

function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const cartItems = useSelector((state) => state.cart);

  // State for managing product editing
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: '',
    image: '',
    price: 0,
  });


  // Fetch products on component mount
  useEffect(() => {
    // Check if products are not already fetched
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);



  // Handler for initiating product edit
// Handler for initiating product edit
const handleEdit = (product) => {
  setEditingProductId(product.id);

  // Set editedProduct state with the product details
  setEditedProduct({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
  });
};


const handleSaveChanges = () => {
  // Dispatch the updateProduct action with the edited product
  dispatch(updateProduct({
    id: editedProduct.id,
    name: editedProduct.name,
    image: editedProduct.image,
    price: editedProduct.price
  }));

  // Clear editing state
  setEditingProductId(null);

  // Clear edited product state
  setEditedProduct({
    id: null,
    name: '',
    image: '',
    price: 0,
  });

  toast.success('Product edited successfully');
};


  // Handler for cancelling edit
  const handleCancelEdit = () => {
    setEditingProductId(null);

    // Clear edited product state
    setEditedProduct({
      id: null,
      name: '',
      image: '',
      price: 0,
    });
  };

  // Handler for deleting a product
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    toast.success('Product deleted successfully');
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

    const [filterByPrice, setFilterByPrice] = useState('');
    // Filter products based on the selected price range
    const filteredProducts = filterByPrice
    ? products.filter((product) => parseFloat(product.price) <= parseFloat(filterByPrice))
    : products;

  // Handler to remove the price filter
  const handleRemoveFilter = () => {
    setFilterByPrice('');
  };

  return (
    <div className="container">

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
        {filterByPrice && (
          <button className="remove-filter-button" onClick={handleRemoveFilter}>
            Remove Filter
          </button>
        )}
      </div>

      {/* Render the list of products */}
      <div className="product-cards">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-details">
              {/* Render image */}
              <img className="product-image" src={product.image} alt={product.name} />

              {/* Render input fields if editing, otherwise render product name */}
              <div className="product-text">
                {editingProductId === product.id ? (
                  <>
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.image}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, image: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, price: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                  </>
                  
                )}
              </div>  
            </div>
                         
            <div className="product-actions">
  {/* Render save and cancel buttons if editing, otherwise render edit and delete buttons */}
  {editingProductId === product.id ? (
    <>
      <button className="edit-button" onClick={handleSaveChanges}>
        Save
      </button>
      <button className="delete-button" onClick={handleCancelEdit}>
        Cancel
      </button>
    </>
  ) : (
    <>
      <button className="edit-button" onClick={() => handleEdit(product)}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        className="delete-button"
        onClick={() => handleDelete(product.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {/* Add the cart button here */}
      <button className="cart-button" onClick={() => handleAddToCart(product)}>
        {cartItems.some((item) => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </>
  )}
</div>

          </div>
        ))}
      </div>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default ProductsList;
