import React, { useState } from 'react';
import { X, ShoppingBag, ChevronLeft, ChevronRight, Star, Droplet, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-content"
                    onClick={e => e.stopPropagation()}
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-grid">
                        <div className="modal-image-col">
                            <div className="image-gallery-container full-height">
                                <motion.img
                                    key={currentImage}
                                    src={currentImage}
                                    alt={product.name}
                                    className="modal-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

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
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                ></span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="modal-info-col scrollable-content">
                            <div className="modal-header">
                                <div className="badge-container">
                                    <span className="modal-tag type">{product.skinType}</span>
                                    <span className="modal-tag benefit">{product.benefit}</span>
                                </div>
                                <h2 className="modal-title">{product.name}</h2>
                                <div className="modal-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#D4A373" color="#D4A373" />
                                        ))}
                                    </div>
                                    <span className="review-count">(12 reseñas)</span>
                                </div>
                                <span className="modal-price">${product.price.toFixed(2)} MXN</span>
                            </div>

                            <div className="modal-body">
                                <p className="description-text">{product.description}</p>

                                <div className="ingredients-highlight">
                                    <h4><Droplet size={18} /> Ingredientes Clave</h4>
                                    <p>{product.ingredients}</p>
                                </div>

                                <div className="ritual-section">
                                    <h4><Clock size={18} /> El Ritual de Uso</h4>
                                    <ol className="ritual-steps">
                                        <li>Humedece la piel con agua tibia para abrir los poros.</li>
                                        <li>Frota el jabón entre las manos para activar la espuma cremosa.</li>
                                        <li>Masajea suavemente en círculos, respira el aroma natural.</li>
                                        <li>Enjuaga con agua fresca para tonificar.</li>
                                    </ol>
                                </div>

                                <div className="guarantee-box">
                                    <Shield size={18} />
                                    <span>Libre de parabenos • Cruelty Free • 100% Vegano</span>
                                </div>
                            </div>

                            <div className="modal-footer-sticky">
                                <button className="btn btn-primary btn-block" onClick={handleAddToCart}>
                                    <ShoppingBag size={20} style={{ marginRight: '8px' }} />
                                    Agregar al Carrito - ${product.price.toFixed(2)}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductModal;
