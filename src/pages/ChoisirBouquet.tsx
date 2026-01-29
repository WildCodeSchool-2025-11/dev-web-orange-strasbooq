import { useEffect, useState } from "react";
import CardBouquet from "./CardBouquet";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
}

function ChoisirBouquet() {
	const [bouquets, setBouquets] = useState<Bouquet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [favorites, setFavorites] = useState<number[]>([]);

	useEffect(() => {
		const fetchBouquets = async () => {
			try {
				const response = await fetch("https://api-strasbouq.vercel.app/items");
				const data: Bouquet[] = await response.json();
				setBouquets(data);
				setLoading(false);
			} catch (error) {
				console.error("Erreur lors de la récupération des bouquets :", error);
				setLoading(false);
			}
		};
		fetchBouquets();
	}, []);

	const handleToggleFavorite = (bouquet: Bouquet) => {
		setFavorites((prev) =>
			prev.includes(bouquet.id)
				? prev.filter((id) => id !== bouquet.id)
				: [...prev, bouquet.id],
		);
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p>Chargement en cours...</p>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<header className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">
					Nos Bouquets Disponibles à la vente
				</h1>
				<p className="text-gray-600">
					Sélectionnez votre bouquet préféré et ajoutez-le à votre panier.
				</p>
			</header>

			<section>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
					{bouquets.map((bouquet) => (
						<CardBouquet
							key={bouquet.id}
							bouquet={bouquet}
							onToggleFavorite={handleToggleFavorite}
							isFavorite={favorites.includes(bouquet.id)}
						/>
					))}
				</div>
			</section>
		</main>
	);
}

export default ChoisirBouquet;
