interface ItemCardProps {
	nom: string;
	description: string;
	prix: number;
	image: string;
}

function ItemCard({ nom, description, prix, image }: ItemCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
			<img
				src={image}
				alt={nom}
				className="w-full h-48 object-cover rounded mb-3"
			/>
			<div className="p-4 flex-grow">
				<h3 className="text-lg font-semibold mb-1">{nom}</h3>
				<p className="text-gray-600 text-sm mb-2 flex-grow">{description}</p>
				<p className="text-pink-600 font-bold text-lg mb-3">{prix}€</p>
				<button
					type="button"
					className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					+ Ajouter au bouquet
				</button>
			</div>
		</div>
	);
}

export default ItemCard;
