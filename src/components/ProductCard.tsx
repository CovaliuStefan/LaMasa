import { useState } from "react";
import { Product } from "../data/menuData";

interface ProductCardProps {
	product: Product;
	onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
	const [available, setAvailable] = useState(product.available);

	return (
		<div
			className="border p-3 rounded shadow bg-white cursor-pointer hover:shadow-md transition w-full max-w-[35vw] min-w-[250px] hover:scale-105 hover:shadow-lg shadow-sm"
			onClick={onClick}
		>

			<img
				src={`/images/products/${product.id}.png`}
				onError={(e) => (e.currentTarget.src = "/images/products/placeholder.png")}
				alt={product.name}
				className="w-[500px] h-[200px] object-cover rounded-t mx-auto hover:brightness-105 "
			/>

			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-lg font-bold">{product.name}</h3>
					<p className="text-sm text-gray-600">{product.description}</p>
					<p className="mt-1 font-medium">${product.price}</p>
				</div>
				<span
					className={`w-3 h-3 mt-1 rounded-full ${available ? "bg-green-500" : "bg-red-500"
						}`}
				></span>
			</div>

			<div className="mt-4 flex justify-between items-center">
				<label
					className="flex items-center gap-2"
					onClick={(e) => e.stopPropagation()}
				>
					<input
						type="checkbox"
						checked={available}
						onChange={() => setAvailable(!available)}
					/>
					<span className="text-sm ">Available</span>
				</label>

				<button
					className="bg-[rgb(204,102,0)] text-white px-3 py-1 rounded disabled:opacity-50"
					disabled={!available}
					onClick={(e) => {
						e.stopPropagation();
						onClick?.();
					}}
				>
					Add to Order
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
