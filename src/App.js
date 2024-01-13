import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';
import NewProductForm from './components/NewProductForm';

// Main App component wrapping the entire application
function App() {
  return (
    // Redux Provider to connect the Redux store to the React app
    <Provider store={store}>
      {/* Router for handling navigation and routing */}
      <Router>
        <div className="App">
          <NavBar />

          {/* routes and their corresponding components */}
          <Routes>
          <Route path="/" element={<ProductList />} />
            <Route path="/newProductForm" element={<NewProductForm />} />
            <Route path="/cart" element={<Cart />} />
            
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
