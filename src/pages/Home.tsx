import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/menuData";
import Header from "../components/Header";
import CartModal from "../components/CartModal";
import Footer from "../components/Footer";

interface CartItem {
  product: Product;
  quantity: number;
  comment?: string;
}

const Home = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [showCart, setShowCart] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, comment?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.comment === comment
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, comment }];
    });
  };

  const handleRemoveFromCart = (product: Product, comment?: string) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.comment === comment
      );
      if (index === -1) return prev;

      const updated = [...prev];
      if (updated[index].quantity === 1) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity -= 1;
      }
      return updated;
    });
  };

  const handleClearCart = () => setCart([]);

  const handleSetComment = (product: Product, comment: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === product.id && item.comment === item.comment
          ? { ...item, comment }
          : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />

      <section className="bg-[url('/background-image.png')] bg-cover bg-center text-white">
        <div className="backdrop-blur-sm bg-black/50 flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to La Masa</h1>
            <p className="text-lg mb-6">Fast, fresh & delicious. Order now!</p>
            <Link
              to="/menu"
              className="bg-[rgb(204,102,0)] px-6 py-3 rounded-full font-semibold text-white hover:bg-opacity-90 transition"
            >
              Start Order
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <img
            src="/images/restaurant.jpg"
            alt="Our restaurant"
            className="rounded-lg shadow-lg w-full md:w-1/2 object-cover"
          />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-[rgb(204,102,0)]">About Us</h2>
            <p>
              At La Masa, we’re passionate about delivering fresh, delicious meals
              made with love and top-quality ingredients. Whether you're dining in or
              ordering online, we promise a culinary experience that feels just like home.
            </p>
            <p>
              Our team is dedicated to fast service, great taste, and making sure you
              always leave satisfied.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100 text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <span className="text-4xl">🍕</span>
            <h3 className="text-lg font-semibold mt-2">Delicious Recipes</h3>
            <p>Enjoy our carefully crafted menu of pizzas, burgers, and drinks.</p>
          </div>
          <div>
            <span className="text-4xl">⚡</span>
            <h3 className="text-lg font-semibold mt-2">Fast Delivery</h3>
            <p>Your food is delivered hot and fresh, every time, right to your door.</p>
          </div>
          <div>
            <span className="text-4xl">💬</span>
            <h3 className="text-lg font-semibold mt-2">Easy Ordering</h3>
            <p>Our menu is simple to browse and fast to order. Just a few clicks away.</p>
          </div>
        </div>
      </section>

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onSetComment={handleSetComment}
        />
      )}

      <Footer />
    </>
  );
};

export default Home;
