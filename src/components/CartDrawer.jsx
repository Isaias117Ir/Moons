import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalItems
    } = useCart();

    const navigate = useNavigate();
    const drawerRef = useRef(null);

    // Close drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                // Check if click was on the toggle button itself to avoid conflict
                // For now, simpler approach: just close if open
                if (isCartOpen) toggleCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, toggleCart]);

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "528129467105";
        let message = "Hola Moons! 🌿 Me gustaría hacer un pedido:\n\n";
        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });
        message += `\n*Total: $${totalPrice.toFixed(2)} MXN*`;
        message += "\n\n¿Tienen envíos disponibles?";

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <h2>Tu Carrito ({totalItems})</h2>
                            <button onClick={toggleCart} className="close-btn">
                                <X size={24} />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <div className="empty-cart-state">
                                <ShoppingBag size={48} className="empty-icon" />
                                <p>Tu carrito está vacío</p>
                                <button className="btn btn-primary" onClick={() => {
                                    toggleCart();
                                    navigate('/store');
                                }}>
                                    Ir a la Tienda
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items-list">
                                    {cart.map(item => (
                                        <div key={item.id} className="drawer-item">
                                            <div className="item-img-container">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-info">
                                                <h4>{item.name}</h4>
                                                <p className="item-price">${item.price}</p>
                                                <div className="qty-controls">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                        <Minus size={14} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="total-row">
                                        <span>Total</span>
                                        <span className="total-amount">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button className="btn btn-whatsapp w-100" onClick={handleWhatsAppCheckout}>
                                        <MessageCircle size={20} />
                                        Completar Pedido
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
