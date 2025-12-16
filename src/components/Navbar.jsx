import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { totalItems, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <Leaf className="logo-icon" size={28} />
                    <span>Moons</span>
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/store" className="nav-link">Tienda</Link>
                    <a href="#about" className="nav-link">Nosotros</a>
                </div>

                <div className="navbar-actions">
                    <button onClick={toggleCart} className="cart-btn" aria-label="Abrir carrito">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </button>

                    <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                    <Link to="/store" onClick={() => setIsMenuOpen(false)}>Tienda</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
