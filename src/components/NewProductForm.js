import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/reducers/productReducers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/NewProductForm.css';

const NewProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage form inputs
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(''); 

  // State to manage the error message
  const [errorMessage, setErrorMessage] = useState('');

  const uniqueIdFunction = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleAddProduct = () => {
    // Check if required fields are not empty
    if (productName.trim() !== '' && imageUrl.trim() !== '' && price.trim() !== '' && category.trim() !== '') {
      // Dispatch the addProduct action with the new product details and a unique ID
      dispatch(addProduct({
        id: uniqueIdFunction(),
        name: productName,
        image: imageUrl,
        price: parseFloat(price), 
        category: category
      }));

    
      // Reset the form fields
      setProductName('');
      setImageUrl('');
      setPrice('');
      setCategory('');

      // Navigate to the root route
      navigate('/');

      // Display success notification
      toast.success('Product added successfully');

    } else {
      // Set error message to be displayed on the form
      setErrorMessage('Please fill in all the required fields');
    }
  };

  return (
    <div className='form-container'>
      <h2>Add New Product</h2>

      {/* Display error message if there is any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Input fields for entering new product details */}
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder='Enter product name'
        />
      </label>

      <label>
        Product Image:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='Enter image URL'
        />
      </label>

      <label>
        Product Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Enter price'
        />
      </label>

      {/* Dropdown for selecting product category */}
      <label>
        Product Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select product category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Electronics">Electronics</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Other">Other</option>
        </select>
      </label>

      {/* Button to add a new product */}
      <button onClick={handleAddProduct}> + Add Product</button>
    </div>
  );
};

export default NewProductForm;
