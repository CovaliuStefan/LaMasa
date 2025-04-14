import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white text-sm py-6"
      style={{ backgroundColor: "rgba(204, 102, 0, 1)" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          © 2025 La Masa. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/menu" className="hover:underline">
            Menu
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
