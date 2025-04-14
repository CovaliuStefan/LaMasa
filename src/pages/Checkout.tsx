import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum: number, item: any) => sum + item.quantity * item.product.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Comanda a fost trimisă cu succes!");
    console.log("Comanda:", form, "Total:", total.toFixed(2), "Produse:", cart);
  };

  return (
    <>
      <Header cartCount={cart.reduce((sum: number, item: any) => sum + item.quantity, 0)} onCartClick={() => {}} />

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow max-w-2xl mx-auto w-full p-6">
          <h1 className="text-3xl font-bold mb-6">Detalii pentru livrare</h1>

          {/* Total coș */}
          <div className="mb-4 text-lg font-semibold text-[rgb(204,102,0)]">
            Total de plată: ${total.toFixed(2)}
          </div>

          {/* Formular */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nume complet"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Numar de telefon"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Adresa de livrare"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              name="notes"
              placeholder="Note pentru livrare (opțional)"
              value={form.notes}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-[rgb(204,102,0)] text-white px-6 py-2 rounded hover:bg-opacity-90"
            >
              Trimite comanda
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
