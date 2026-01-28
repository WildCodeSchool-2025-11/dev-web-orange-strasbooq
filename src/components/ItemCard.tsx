interface ItemCardProps {
	nom: string;
	description: string;
	prix: number;
	image: string;
}

function ItemCard({ nom, description, prix, image }: ItemCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full">
			<img
				src={image}
				alt={nom}
				className="w-full h-48 object-cover rounded mb-3"
			/>
			<div className="flex flex-col flex-grow">
				<h3 className="text-lg font-semibold mb-1">{nom}</h3>
				<p className="text-gray-600 text-sm mb-2 flex-grow">{description}</p>
				<p className="text-pink-600 font-bold text-lg mb-3">{prix}€</p>
				<button
					type="button"
					className="mt-auto w-full inline-flex justify-center gap-2 bg-blue-200 py-2 px-6 rounded-xl cursor-pointer hover:bg-blue-300 transition-all duration-300 border border-blue-300 shadow"
				>
					+ Ajouter au bouquet
				</button>
			</div>
		</div>
	);
}

export default ItemCard;
