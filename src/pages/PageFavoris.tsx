import { useEffect, useState } from "react";
import CardBouquet from "./CardBouquet";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
}

function PageFavoris() {
	const [bouquets, setBouquets] = useState<Bouquet[]>([]);
	const [favorites, setFavorites] = useState<Bouquet[]>(() => {
		try {
			const savedFavorites = localStorage.getItem("favorites");
			return savedFavorites ? JSON.parse(savedFavorites) : [];
		} catch (error) {
			console.error("Erreur lors de la récupération des favoris :", error);
			return [];
		}
	});

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("https://api-strasbouq.vercel.app/items")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Erreur réseau lors de la récupération des bouquets");
				}
				return response.json();
			})
			.then((data) => {
				setBouquets(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des bouquets :", error);
				setError(error.message);
				setLoading(false);
			});
	}, []);

	// retirer des favoris
	const handleRemoveFavorite = (bouquet: Bouquet) => {
		const updateFavorites = favorites.filter((fav) => fav.id !== bouquet.id);
		setFavorites(updateFavorites);
		localStorage.setItem("favorites", JSON.stringify(updateFavorites));
	};

	//filter favorites
	const favoritesBouquet = bouquets.filter((bouquet) =>
		favorites.some((fav) => fav.id === bouquet.id),
	);
	if (loading) {
		return <div>Chargement...</div>;
	}
	if (error) {
		return <div>Erreur: {error}</div>;
	}
	if (favoritesBouquet.length === 0) {
		return <div>Vous n'avez pas de bouquets favoris pour le moment.</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Mes Bouquets Favoris</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{favoritesBouquet.map((bouquet) => (
					<div key={bouquet.id} className="bg-gray-50 ">
						<CardBouquet
							bouquet={bouquet}
							onToggleFavorite={handleRemoveFavorite}
							isFavorite={true}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default PageFavoris;
