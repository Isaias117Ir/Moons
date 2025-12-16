import React, { useState, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { products } from '../data/products';
import './Store.css';
import GrowingVines from '../components/GrowingVines';

const Store = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedSkinType, setSelectedSkinType] = useState('Todos');
    const [selectedBenefit, setSelectedBenefit] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // Extract unique values for filters
    const skinTypes = ['Todos', ...new Set(products.map(p => p.skinType))];
    const benefits = ['Todos', ...new Set(products.map(p => p.benefit))];

    useEffect(() => {
        let result = products;

        if (selectedSkinType !== 'Todos') {
            result = result.filter(p => p.skinType === selectedSkinType);
        }

        if (selectedBenefit !== 'Todos') {
            result = result.filter(p => p.benefit === selectedBenefit);
        }

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [selectedSkinType, selectedBenefit, searchQuery]);

    const clearFilters = () => {
        setSelectedSkinType('Todos');
        setSelectedBenefit('Todos');
        setSearchQuery('');
    };

    return (
        <div className="store-page container">
            <GrowingVines />

            <div className="store-header-modern">
                <div className="header-content">
                    <h1>Nuestra Colección</h1>
                    <p>Encuentra el jabón perfecto para tu ritual diario.</p>
                </div>

                <div className="store-controls">
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar jabón..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery('')}>
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <button
                        className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={20} /> Filtros
                    </button>
                </div>
            </div>

            <div className="store-layout">
                <aside className={`store-sidebar ${showFilters ? 'active' : ''}`}>
                    <div className="sidebar-header mobile-only">
                        <h3>Filtros</h3>
                        <button onClick={() => setShowFilters(false)}><X size={24} /></button>
                    </div>

                    <div className="filter-group">
                        <h3>Tipo de Piel</h3>
                        <div className="pills-container">
                            {skinTypes.map(type => (
                                <button
                                    key={type}
                                    className={`filter-pill ${selectedSkinType === type ? 'active' : ''}`}
                                    onClick={() => setSelectedSkinType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Beneficios</h3>
                        <div className="pills-container">
                            {benefits.map(benefit => (
                                <button
                                    key={benefit}
                                    className={`filter-pill ${selectedBenefit === benefit ? 'active' : ''}`}
                                    onClick={() => setSelectedBenefit(benefit)}
                                >
                                    {benefit}
                                </button>
                            ))}
                        </div>
                    </div>

                    {(selectedSkinType !== 'Todos' || selectedBenefit !== 'Todos' || searchQuery) && (
                        <button className="btn-clear-filters" onClick={clearFilters}>
                            Limpiar Todo
                        </button>
                    )}
                </aside>

                <main className="store-grid-wrapper">
                    <motion.div
                        className="store-grid"
                        layout
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard
                                            product={product}
                                            onOpen={setSelectedProduct}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    className="no-products"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <p>No encontramos jabones con esas características.</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={clearFilters}
                                    >
                                        Ver todos los productos
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default Store;
