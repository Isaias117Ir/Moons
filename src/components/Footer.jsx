import React from 'react';
import { Leaf, Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="brand-logo">
                        <Leaf size={24} />
                        <span>Moons</span>
                    </div>
                    <p>Jabones artesanales creados con ingredientes 100% orgánicos y mucho amor. Cuida tu piel, cuida el planeta.</p>
                </div>

                <div className="footer-links">
                    <h3>Explorar</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/store">Tienda</Link></li>
                        <li><Link to="/about">Sobre Nosotros</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contacto</h3>
                    <ul>
                        <li><Mail size={16} /> hola@moons.mx</li>
                        <li>Monterrey, NL, México</li>
                    </ul>
                    <div className="social-icons">
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Moons Jabones Artesanales. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
