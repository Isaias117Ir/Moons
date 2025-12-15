import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "528129467105"; // Gaia Jabones WhatsApp

        let message = "Hola Moons! 🌿 Me gustaría hacer un pedido:\n\n";

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });

        message += `\n*Total: $${totalPrice.toFixed(2)} MXN*`;
        message += "\n\n¿Tienen envíos disponibles?";

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="cart-page container">
            <h1 className="cart-title">Tu Carrito ({totalItems} productos)</h1>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Tu carrito está vacío.</p>
                    <Link to="/store" className="btn btn-primary">Ir a la Tienda</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />

                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)} MXN</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                        title="Eliminar"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Resumen del Pedido</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)} MXN</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío</span>
                            <span>$0.00 MXN</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)} MXN</span>
                        </div>

                        <button className="btn btn-primary btn-block checkout-btn" onClick={handleWhatsAppCheckout}>
                            <MessageCircle size={20} style={{ marginRight: '8px' }} />
                            Pedir por WhatsApp
                        </button>

                        <button className="btn btn-secondary btn-block" onClick={() => navigate('/store')}>
                            Seguir Comprando
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
