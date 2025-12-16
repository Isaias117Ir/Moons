import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Sun, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.css';

const Home = () => {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="home">
            {/* Cinematic Hero Section */}
            <section className="hero">
                <motion.div
                    className="hero-background"
                    style={{ y: yHero }}
                >
                    <div className="hero-overlay"></div>
                </motion.div>

                <div className="container hero-content-wrapper">
                    <motion.div
                        className="hero-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ opacity: opacityHero }}
                    >
                        <motion.span className="hero-eyebrow" variants={itemVariants}>
                            Artesanal • Orgánico • Puro
                        </motion.span>
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            La Esencia de la <br />
                            <span className="text-highlight">Naturaleza</span> en tu Piel
                        </motion.h1>
                        <motion.p className="hero-subtitle" variants={itemVariants}>
                            Descubre <strong>Moons</strong>. Jabones creados para despertar tus sentidos
                            y nutrir tu cuerpo con ingredientes 100% vivos.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <Link to="/store" className="btn btn-primary btn-lg">
                                Explorar Colección <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Elements (Micro-interactions) */}
                <FloatingParticles />
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="features-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <FeatureCard
                            icon={<Sun size={32} />}
                            title="100% Natural"
                            desc="Ingredientes puros seleccionados para una mezcla perfecta de aroma y nutrición."
                        />
                        <FeatureCard
                            icon={<Droplet size={32} />}
                            title="Hidratación Profunda"
                            desc="Aceites esenciales prensados en frío que revitalizan cada poro de tu piel."
                        />
                        <FeatureCard
                            icon={<Heart size={32} />}
                            title="Hecho a Mano"
                            desc="Cada pieza es cortada y empacada individualmente, única como tú."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Intro to Shop */}
            <section className="shop-preview">
                <div className="container">
                    <motion.div
                        className="preview-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Descubre Nuestros Favoritos</h2>
                        <p>Desde relajante lavanda hasta energizante cítrico, encuentra el equilibrio perfecto.</p>
                        <Link to="/store" className="btn btn-secondary">Ir a la Tienda</Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        className="feature-card"
        whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
    </motion.div>
);

const FloatingParticles = () => {
    return (
        <div className="particles-container">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="particle"
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 2
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        bottom: '-10%',
                        width: `${Math.random() * 60 + 20}px`,
                        height: `${Math.random() * 60 + 20}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default Home;
