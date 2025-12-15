import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Sun, Heart } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">La Esencia de la Naturaleza en tu Piel</h1>
                    <p className="hero-subtitle">Descubre <strong>Moons - Jabones artesanales naturistas</strong>, creados con ingredientes 100% orgánicos para nutrir y revitalizar tu cuerpo.</p>
                    <Link to="/store" className="btn btn-primary">
                        Ver Colección <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><Sun size={32} /></div>
                        <h3>100% Natural</h3>
                        <p>Ingredientes puros selecionados con cuidado para lograr una mezcla perfecta de aroma y nutrición para tu piel</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Droplet size={32} /></div>
                        <h3>Hidratación Profunda</h3>
                        <p>Aceites esenciales que nutren tu piel.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Heart size={32} /></div>
                        <h3>Hecho a Mano</h3>
                        <p>Cada jabón es único y creado con amor.</p>
                    </div>
                </div>
            </section>

            {/* Intro to Shop */}
            <section className="shop-preview">
                <div className="container">
                    <div className="preview-content">
                        <h2>Descubre Nuestros Favoritos</h2>
                        <p>Desde relajante lavanda hasta energizante cítrico, encuentra el jabón perfecto para tu tipo de piel.</p>
                        <Link to="/store" className="btn btn-secondary">Explorar Tienda</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
