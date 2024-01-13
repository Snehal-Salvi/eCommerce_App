import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, addProduct } from '../redux/reducers/productReducers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/NewProductForm.css';

// Component for adding a new product
const NewProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new product object
      const newProduct = {
        name: productName,
        price: productPrice,
        image: productImageUrl,
        category: productCategory,
      };

      // Dispatch action to add the new product
      dispatch(addProduct(newProduct));

      // Display success toast
      toast.success('Product added successfully');

      // Fetch updated list of products
      dispatch(fetchProducts());

      // Clear form inputs
      setProductName('');
      setProductPrice('');
      setProductImageUrl('');
      setProductCategory('');
    } catch (error) {
      // Handle errors
      console.error('Failed to add product:', error);
      toast.error('Failed to add product');
    }
  };

  // Options for product categories
  const categoryOptions = ['Men', 'Women', 'Electric', 'Jewelry'];

  // Render the component
  return (
    <div className="form-container">
      <h2>New Product Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name input */}
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </label>

        {/* Product Price input */}
        <label>
          Product Price:
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
        </label>

        {/* Image URL input */}
        <label>
          Image URL:
          <input
            type="text"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </label>

        {/* Category dropdown */}
        <label>
          Category:
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {/* Submit button */}
        <button type="button" onClick={handleSubmit}>
          Add Product
        </button>

        {/* Toast notifications */}
        <ToastContainer autoClose={3000} />
      </form>
    </div>
  );
};

export default NewProductForm;
