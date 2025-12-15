import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { products } from '../data/products';
import './Store.css';
import GrowingVines from '../components/GrowingVines';

const Store = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedSkinType, setSelectedSkinType] = useState('Todos');
    const [selectedBenefit, setSelectedBenefit] = useState('Todos');
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

        setFilteredProducts(result);
    }, [selectedSkinType, selectedBenefit]);

    return (
        <div className="store-page container">
            <GrowingVines />
            <div className="store-header">
                <h1>Tienda</h1>
                <button
                    className="filter-toggle-btn"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} /> Filtros
                </button>
            </div>

            <div className="store-layout">
                <aside className={`store-sidebar ${showFilters ? 'active' : ''}`}>
                    <div className="filter-group">
                        <h3>Tipo de Piel</h3>
                        <div className="filter-options">
                            {skinTypes.map(type => (
                                <label key={type} className="radio-label">
                                    <input
                                        type="radio"
                                        name="skinType"
                                        value={type}
                                        checked={selectedSkinType === type}
                                        onChange={(e) => setSelectedSkinType(e.target.value)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Beneficios</h3>
                        <div className="filter-options">
                            {benefits.map(benefit => (
                                <label key={benefit} className="radio-label">
                                    <input
                                        type="radio"
                                        name="benefit"
                                        value={benefit}
                                        checked={selectedBenefit === benefit}
                                        onChange={(e) => setSelectedBenefit(e.target.value)}
                                    />
                                    <span>{benefit}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="store-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onOpen={setSelectedProduct}
                            />
                        ))
                    ) : (
                        <div className="no-products">
                            <p>No se encontraron productos con estos filtros.</p>
                            <button
                                className="btn btn-secondary"
                                onClick={() => { setSelectedSkinType('Todos'); setSelectedBenefit('Todos'); }}
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
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
