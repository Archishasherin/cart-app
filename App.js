import React, { useState, useEffect } from "react";import "./App.css";
export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(r => r.json())
      .then(d => setProducts(d));
  }, []);

  const addToCart = (p) => {
    if (cart.find(i => i.id === p.id)) return alert("Item already added to the cart");
    setCart([...cart, p]);
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold">Fake Store</h1>
        <button onClick={() => setShow(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Cart <span className="bg-red-500 px-2 py-1 rounded-full text-xs">{cart.length}</span>
        </button>
      </nav>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img src={p.image} className="w-full h-40 object-contain" />
            <h2 className="font-semibold mt-2 text-sm">{p.title}</h2>
            <p className="font-bold text-lg">₹{(p.price * 83).toFixed(2)}</p>

            <button onClick={() => addToCart(p)} className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg">Add to Cart</button>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              cart.map(i => (
                <div key={i.id} className="flex items-center mb-4">
                  <img src={i.image} className="w-16 h-16 object-contain mr-4" />
                  <div className="flex-1">
                    <p className="font-semibold">{i.title}</p>
                    <p className="font-bold">₹{(i.price * 83).toFixed(2)}</p>

                  </div>
                  <button onClick={() => removeFromCart(i.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg">Remove</button>
                </div>
              ))
            )}
            <button onClick={() => setShow(false)} className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}