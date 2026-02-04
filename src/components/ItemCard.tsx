import { useCustomBouquet } from "../context/CustomBouquetContext";

interface ItemCardProps {
	item : {
		id: string;
		nom: string;
		description: string;
	    prix: number;
	    image: string;
		quantity: number;
		categorie: string;
} }


function ItemCard({ item }: ItemCardProps) {
	const {cartItems, addItems, updateQuantity, removeFromCart} = useCustomBouquet();

	const existingItem = cartItems.find(i => i.id === item.id);
	const quantity = existingItem?.quantity || 0;

	const handleFirstAdd = () => {
		addItems({ ...item, quantity: 1 });
	};

	const handleAdd = () => {
		const newQuantity = quantity + 1;
		updateQuantity(item.id, newQuantity);
	};

	const handleRemove = () => {
		const newQuantity = quantity - 1;
		if (newQuantity <= 0) {
			removeFromCart(item.id);
		} else {
			updateQuantity(item.id, newQuantity);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full">
			<img
				src={item.image}
				alt={item.nom}
				className="w-full h-48 object-cover rounded mb-3"
			/>
			<div className="flex flex-col grow">
				<h3 className="text-lg font-semibold mb-1">{item.nom}</h3>
				<p className="text-gray-600 text-sm mb-2 grow">{item.description}</p>
				<p className="text-pink-600 font-bold text-lg mb-3">{item.prix}€</p>
				{quantity === 0 ? (
					<button
						type="button"
						onClick={handleFirstAdd}
						className="mt-auto w-full inline-flex justify-center gap-2 bg-blue-200 py-2 px-6 rounded-xl cursor-pointer hover:bg-blue-300 transition-all duration-300 border border-blue-300 shadow"
						> + Ajouter au bouquet
				</button>
				) : (
					<div className="flex items-center justify-center gap-4 mt-auto">
						<button 
						type="button" 
						onClick={handleRemove}
						className="bg-blue-200 text-white w-8 h-8 rounded-full hover:bg-blue-300 transition-colors duration-200"
						>
							-
						</button>
						<span className="text-lg font-semibold px-4">
							{quantity}
						</span>
						<button 
						type="button" 
						onClick={handleAdd}
						className="bg-blue-200 text-white w-8 h-8 rounded-full hover:bg-blue-300 transition-colors duration-200"
						>
							+
						</button>
			    </div>
				)}
		</div>
	</div>
	);
}

export default ItemCard;