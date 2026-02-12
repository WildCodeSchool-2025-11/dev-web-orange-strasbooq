// src/components/CardBouquet.tsx
import CartIcon from "../assets/Cart.svg";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
	Color: string[];
}

interface CardBouquetProps {
	bouquet: Bouquet;
	onToggleFavorite: (bouquet: Bouquet) => void;
	isFavorite?: boolean;
	onAddToCart: (bouquet: Bouquet) => void;
	/** NEW PROP – indique si le produit est en rupture de stock */
	isDisabled?: boolean;
}

function CardBouquet({
	bouquet,
	onToggleFavorite,
	isFavorite = false,
	onAddToCart,
	isDisabled = false,
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
			<p className="text-center py-2 font-bold text-2xl">
				{bouquet.prix.toFixed(2)}€
			</p>

			<div className="flex flex-col items-center justify-center gap-2 py-4">
				{/* Bouton favori – inchangé */}
				<button
					type="button"
					onClick={() => onToggleFavorite(bouquet)}
					className="bg-red-200 py-2 px-6 rounded-xl cursor-pointer hover:bg-red-300 transition-all duration-300 border border-red-300 shadow"
				>
					{isFavorite ? "❤️ Retirer des Favoris" : "🖤 Ajouter aux Favoris"}
				</button>

				{/* --------- BOUTON PANIER --------- */}
				<button
					type="button"
					onClick={() => onAddToCart(bouquet)}
					disabled={isDisabled}
					className={`
            inline-flex gap-2
            ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-200 hover:bg-blue-300"}
            py-2 px-6 rounded-xl
            border border-blue-300 shadow
            transition-all duration-300
          `}
				>
					<img src={CartIcon} alt="Panier" />
					{/* Texte dynamique */}
					{isDisabled ? "Rupture de stock" : "Ajouter au Panier"}
				</button>
			</div>
		</div>
	);
}

export default CardBouquet;
