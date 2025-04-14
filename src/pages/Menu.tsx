import { useState, useEffect } from "react";
import { menuData, Product } from "../data/menuData";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import ProductModal from "../components/ProductModal";
import CartModal from "components/CartModal";
import Footer from "components/Footer";

interface CartItem {
  product: Product;
  quantity: number;
  comment?: string;
}

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const handleClearCart = () => setCart([]);

  const filteredData = selectedCategory
    ? menuData.filter((cat) => cat.category === selectedCategory)
    : menuData;

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

  const handleSetComment = (product: Product, comment: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === product.id && item.comment === item.comment) {
          return { ...item, comment };
        }
        return item;
      })
    );
  };

  const getProductQuantity = (productId: string): number => {
    return cart
      .filter((item) => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header
        cartCount={Object.values(cart).reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
        onCartClick={() => setShowCart(true)}
      />

      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background-image.png')" }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm pointer-events-none" />

        <div className="relative z-10">
          <div className="bg-white backdrop-blur-sm shadow-md px-8 py-4 space-y-4">
            <div className="flex justify-center flex-wrap gap-2">
              {["All", ...menuData.map((cat) => cat.category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(cat === "All" ? null : cat)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat ||
                    (cat === "All" && selectedCategory === null)
                      ? "bg-[rgb(204,102,0)] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <input
                type="text"
                placeholder="Search for a dish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-2/3 px-4 py-2 border rounded-lg shadow-sm"
              />
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "asc" | "desc" | "none")
                }
                className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
              >
                <option value="none">Sort by price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="pt-5 px-4">
            <div className="p-4">
              {filteredData.map((cat) => {
                const visibleProducts = cat.products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sortOrder === "asc") return a.price - b.price;
                    if (sortOrder === "desc") return b.price - a.price;
                    return 0;
                  });

                if (visibleProducts.length === 0) return null;

                return (
                  <div key={cat.category} className="mb-16">
                    <h2 className="text-3xl font-semibold m-4 mb-8">
                      {cat.category}
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-around">
                      {visibleProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => setSelectedProduct(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {selectedProduct && (
                <ProductModal
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onAdd={handleAddToCart}
                />
              )}
            </div>

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
          </div>
        </div>
      </div>
	  <Footer/>
    </>
  );
};

export default Menu;
