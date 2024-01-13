import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

// Navigation bar component
function NavBar() {
    return (
        <nav className="navbar">
            {/* Left section with links */}
            <div className="left-section">
                <Link to="/" className="nav-link">eCommerce</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/newProductForm" className="nav-link">Add New Product +</Link>
            </div>

            {/* Right section with user-related links */}
            <div className="right-section">
                <Link to="/cart" className="nav-link">
                    {/* Cart icon */}
                    <img
                        className="cartIcon"
                        alt="Cart-Icon" 
                        src="https://cdn-icons-png.flaticon.com/128/4715/4715128.png"    
                    />
                </Link>
                <Link to="/" className="nav-link">Snehal Salvi</Link>
            </div>
        </nav>
    );
}

export default NavBar;
