import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/get_products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleBuyClick = (product) => {
    navigate("purchase", { state: { product } });
  };

  if (products.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <p className="text-gray-300 text-xl">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-4">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10 tracking-wide uppercase border-b-4 border-gray-600 inline-block">
        My Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded-xl shadow-md transform transition-all hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-500 relative overflow-hidden"
          >
            <img
              className="h-40 w-full object-cover rounded-md mb-3 border border-gray-700 hover:border-gray-500 transition-all"
              src={product.image_url}
              alt={product.name}
            />
            <h2 className="text-lg font-semibold text-white text-center">
              {product.name}
            </h2>
            <h3 className="text-white text-center text-lg font-medium mt-1">
              Rs.{product.price}
            </h3>
            <button
              onClick={() => handleBuyClick(product)}
              className="w-full mt-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-all"
            >
              View Product
            </button>
            <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs font-bold rounded-full shadow">
              New
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
