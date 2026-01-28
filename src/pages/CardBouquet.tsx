import CartIcon from "../assets/Cart.svg";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
}

interface CardBouquetProps {
	bouquet: Bouquet;
	onToggleFavorite: (bouquet: Bouquet) => void;
	isFavorite?: boolean;
}

function CardBouquet({
	bouquet,
	onToggleFavorite,
	isFavorite = false,
}: CardBouquetProps) {
	return (
		<div className="bg-gray-50 p-5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200/50">
			<img
				src={bouquet.image_url}
				alt={bouquet.nom}
				className="hover:scale-105 transition-transform duration-300"
			/>
			<h2 className="text-center font-bold py-4">{bouquet.nom}</h2>
			<p className="text-center py-4">{bouquet.description}</p>
			<p className="text-center py-2 font-bold text-2xl">{bouquet.prix}€</p>
			<div className="flex flex-col items-center justify-center gap-2 py-4">
				<button
					type="button"
					onClick={() => onToggleFavorite(bouquet)}
					className="bg-red-200 py-2 px-6 rounded-xl cursor-pointer hover:bg-red-300 transition-all duration-300 border border-red-300 shadow"
				>
					{isFavorite ? "❤️ Retirer des Favoris" : "🖤 Ajouter aux Favoris"}
				</button>
				<button
					type="button"
					className="inline-flex gap-2 bg-blue-200 py-2 px-6 rounded-xl cursor-pointer hover:bg-blue-300 transition-all duration-300 border border-blue-300 shadow"
				>
					<img src={CartIcon} alt="Panier" />
					Ajouter au Panier
				</button>
			</div>
		</div>
	);
}

export default CardBouquet;
