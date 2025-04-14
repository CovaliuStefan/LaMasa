import { Link } from "react-router-dom";
import { Product } from "../data/menuData";
import { useEffect } from "react";


interface CartItem {
	product: Product;
	quantity: number;
	comment?: string;
}

interface CartModalProps {
	cart: CartItem[];
	onClose: () => void;
	onAdd: (product: Product, comment?: string) => void;
	onRemove: (product: Product, comment?: string) => void;
	onClear: () => void;
	onSetComment: (product: Product, comment: string) => void;
}

const CartModal = ({ cart, onClose, onAdd, onRemove, onClear, onSetComment }: CartModalProps) => {
	const total = cart.reduce(
		(sum, item) => sum + item.quantity * item.product.price,
		0
	);

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

				<h2 className="text-xl font-bold mb-4">Your Order</h2>

				{cart.length === 0 ? (
					<p className="text-gray-500">Your cart is empty.</p>
				) : (
					<>
						<ul className="space-y-4 mb-4">
							{cart.map((item, index) => (
								<li key={index}>
									<div className="flex justify-between items-center mb-1">
										<span className="font-medium">{item.product.name}</span>
										<div className="flex items-center gap-2">
											<span className="ml-4 font-semibold">
												${(item.product.price * item.quantity).toFixed(2)}
											</span>
											<button
												onClick={() => onRemove(item.product, item.comment)}
												className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
											>
												–
											</button>
											<span>{item.quantity}</span>
											<button
												onClick={() => onAdd(item.product, item.comment)}
												className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
											>
												+
											</button>
										</div>
									</div>
									<input
										type="text"
										placeholder="Add comment..."
										value={item.comment || ""}
										onChange={(e) => onSetComment(item.product, e.target.value)}
										className="w-full mt-1 px-2 py-1 border rounded text-sm"
									/>
								</li>
							))}
						</ul>

						<div className="mt-4 flex justify-between items-center">
							<div className="font-bold">Total: ${total.toFixed(2)}</div>

							<div className="flex gap-2">
								<button
									onClick={onClear}
									className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
								>
									Clear Cart
								</button>
								<Link
									to="/checkout"
									className="bg-[rgb(204,102,0)] text-white px-4 py-1 rounded hover:bg-opacity-90 transition"
									onClick={onClose}
								>
									Checkout
								</Link>
							</div>
						</div>

					</>
				)}
			</div>
		</div>
	);
};

export default CartModal;
