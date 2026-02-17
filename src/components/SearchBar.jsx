import { useState } from 'react';

function SearchBar({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const results = products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      (product.aliases && product.aliases.some(alias => alias.toLowerCase().includes(term)))
    );
    
    setFilteredProducts(results);
    setShowResults(true);
  };

  const handleAddProduct = (product) => {
    addToCart(product, 1);
    setSearchTerm("");
    setFilteredProducts([]);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="🔍 Search products by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-5 py-3 rounded-full border-2 border-indigo-200 focus:border-indigo-600 focus:outline-none text-slate-800 placeholder-slate-400 shadow-sm transition-all"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-16 left-0 right-0 bg-white border-2 border-indigo-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <div className="p-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-3 mb-2 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-all"
                >
                  <div>
                    <p className="font-bold text-slate-800">{product.name}</p>
                    <p className="text-sm text-slate-500">₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddProduct(product)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold text-sm"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">
              <p>No products found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
