import { useEffect, useState } from "react";
import { Product } from "../data/menuData";

interface ProductModalProps {
	product: Product;
	onClose: () => void;
	onAdd: (product: Product, comment?: string) => void;
}

const ProductModal = ({
	product,
	onClose,
	onAdd,
}: ProductModalProps) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [comment, setComment] = useState<string>("");

	const handleAdd = () => {
		for (let i = 0; i < quantity; i++) {
			onAdd(product, comment);
		}
		onClose();
	};

	const subtotal = quantity * product.price;

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-black"
				>
					✖
				</button>

				<h2 className="text-2xl font-bold mb-2">{product.name}</h2>
				<p className="text-gray-600 mb-2">{product.description}</p>
				<p className="mb-4 font-semibold">${(product.price).toFixed(2)}</p>

				<p className="mb-4">
					Status:{" "}
					<span className={product.available ? "text-green-600" : "text-red-600"}>
						{product.available ? "Available" : "Not available"}
					</span>
				</p>

				<input
					type="text"
					placeholder="Add comment (optional)..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="w-full mb-4 px-3 py-2 border rounded text-sm"
				/>

				<p className="mb-4 text-right text-sm text-gray-700">
					Subtotal: <span className="font-bold">${(subtotal).toFixed(2)}</span>
				</p>

				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
							className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
						>
							–
						</button>
						<span className="text-lg font-semibold">{quantity}</span>
						<button
							onClick={() => setQuantity((prev) => prev + 1)}
							className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
						>
							+
						</button>
					</div>

					<button
						disabled={!product.available}
						onClick={handleAdd}
						className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
					>
						Add to Order
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductModal;
