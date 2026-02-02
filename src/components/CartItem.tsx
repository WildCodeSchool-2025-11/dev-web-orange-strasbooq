interface CartItemProps {
	item: {
		id: number;
		nom: string;
		description: string;
		prix: number;
		image_url: string;
		quantity: number;
	};
	removeFromCart: (bouquetId: number) => void;
	updateQuantity: (bouquetId: number, quantity: number) => void;
}

const CartItem = ({ item, removeFromCart, updateQuantity }: CartItemProps) => {
	return (
		<div className="flex gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
			<img
				src={item.image_url}
				alt={item.nom}
				className="w-20 h-20 object-cover rounded-md"
			/>

			<div className="flex-1">
				<h3 className="font-bold text-gray-800">{item.nom}</h3>
				<p className="text-lg font-semibold text-blue-600 mt-1">
					€{item.prix.toFixed(2)}
				</p>
			</div>

			<div className="flex flex-col items-end justify-between">
				<button
					type="button"
					onClick={() => removeFromCart(item.id)}
					className="text-red-500 hover:text-red-700 font-semibold text-sm cursor-pointer"
				>
					Retirer
				</button>
				<div>
					<button
						type="button"
						onClick={() => updateQuantity(item.id, item.quantity - 1)}
						disabled={item.quantity <= 1}
						className="w-8 h-8 rounded-full bg-red-200 hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700 cursor-pointer"
					>
						-
					</button>
					<span className="w-12 text-center font-semibold">
						{item.quantity}
					</span>
					<button
						type="button"
						onClick={() => updateQuantity(item.id, item.quantity + 1)}
						className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center font-bold text-white cursor-pointer"
					>
						+
					</button>
				</div>

				<p>€{(item.prix * item.quantity).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default CartItem;
