import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Dashboard = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/get_products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

      fetch("http://localhost:8000/users/")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Error fetching customers:", err));

    fetch("http://localhost:8000/get_orders/")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleProductClick = () => {
    setShowProducts(true);
    setShowCustomers(false);
    setShowOrders(false);
  };

  const handleCustomerClick = () => {
    setShowCustomers(true);
    setShowProducts(false);
    setShowOrders(false);
  };

  const handleOrderClick = () => {
    setShowOrders(true);
    setShowProducts(false);
    setShowCustomers(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Wear-Web Admin</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <span className="font-medium">Admin</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <button onClick={handleOrderClick} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition">Orders</button>
          <button onClick={handleCustomerClick} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition">Customers</button>
          <button onClick={handleProductClick} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition">Products</button>
        </aside>

        <main className="flex-1 bg-gray-100 p-6 overflow-x-hidden">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-5 cursor-pointer" onClick={handleOrderClick}>
              <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
              <p className="text-2xl font-bold text-green-600 mt-2">$24,500</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 cursor-pointer" onClick={handleOrderClick}>
              <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
              <p className="text-2xl font-bold text-blue-600 mt-2">{orders.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 cursor-pointer" onClick={handleCustomerClick}>
              <h2 className="text-lg font-semibold text-gray-700">Customers</h2>
              <p className="text-2xl font-bold text-purple-600 mt-2">{customers.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 cursor-pointer" onClick={handleProductClick}>
              <h2 className="text-lg font-semibold text-gray-700">Products</h2>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{products.length}</p>
            </div>
          </div>

          {showProducts && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Product List</h2>
              {products.length === 0 ? (
                <p className="text-gray-500">Loading products...</p>
              ) : (
                <ul className="space-y-2 text-gray-600">
                  {products.map((product) => (
                    <li key={product._id} className="border-b pb-2">
                      {product.name} - Rs.{product.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showCustomers && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer List</h2>
              {customers.length === 0 ? (
                <p className="text-gray-500">Loading customers...</p>
              ) : (
                <ul className="space-y-2 text-gray-600">
                  {customers.map((customer) => (
                    <li key={customer._id} className="border-b pb-2">
                      {customer.name} - {customer.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showOrders && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Order List</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : (
                <ul className="space-y-2 text-gray-600">
                  {orders.map((order) => (
                    <li key={order._id} className="border-b pb-2">
                      #{order.orderId} - {order.customerName} - Rs.{order.amount}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 font-medium">Order ID</th>
                    <th className="py-3 px-4 font-medium">Customer</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4">#1001</td>
                    <td className="py-3 px-4">Jane Doe</td>
                    <td className="py-3 px-4 text-green-600">Completed</td>
                    <td className="py-3 px-4">$250</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">#1002</td>
                    <td className="py-3 px-4">John Smith</td>
                    <td className="py-3 px-4 text-yellow-600">Pending</td>
                    <td className="py-3 px-4">$120</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">#1003</td>
                    <td className="py-3 px-4">Emily Clark</td>
                    <td className="py-3 px-4 text-red-600">Cancelled</td>
                    <td className="py-3 px-4">$340</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
