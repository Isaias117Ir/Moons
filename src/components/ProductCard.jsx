import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onOpen }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div className="product-card" onClick={() => onOpen(product)}>
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="add-to-cart-btn" onClick={handleAddToCart} title="Agregar al carrito">
                    <Plus size={20} />
                </button>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.skinType} • {product.benefit}</p>
                <span className="product-price">${product.price.toFixed(2)} MXN</span>
            </div>
        </div>
    );
};

export default ProductCard;
