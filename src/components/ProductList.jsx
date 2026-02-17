import products from "../data/products";

function ProductList({ addToCart }) {
return (
  <>
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center mb-4"
      >
        <div>
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    ))}
  </>
);

}

export default ProductList;