import React, { useState } from 'react';
import { X, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const hasMultipleImages = product.images && product.images.length > 1;
    const currentImage = hasMultipleImages ? product.images[currentImageIndex] : product.image;

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    <div className="modal-image-col">
                        <div className="image-gallery-container">
                            <img src={currentImage} alt={product.name} className="modal-image" />

                            {hasMultipleImages && (
                                <>
                                    <button className="gallery-nav prev" onClick={handlePrevImage}>
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button className="gallery-nav next" onClick={handleNextImage}>
                                        <ChevronRight size={24} />
                                    </button>
                                    <div className="gallery-dots">
                                        {product.images.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                            ></span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="modal-info-col">
                        <div className="modal-header">
                            <span className="modal-tag">{product.skinType}</span>
                            <h2 className="modal-title">{product.name}</h2>
                            <span className="modal-price">${product.price.toFixed(2)} MXN</span>
                        </div>

                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Descripción</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="modal-section">
                                <h3>Beneficios</h3>
                                <div className="benefit-badge">{product.benefit}</div>
                            </div>

                            <div className="modal-section">
                                <h3>Ingredientes</h3>
                                <p className="ingredients-text">{product.ingredients}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary btn-block" onClick={handleAddToCart}>
                                <ShoppingBag size={20} style={{ marginRight: '8px' }} />
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
