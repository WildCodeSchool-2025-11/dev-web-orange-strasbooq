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

	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const showAlertMessage = (message: string) => {
		setAlertMessage(message);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 5000);
	};

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

	// retirer tous les favoris
	const removeAllFavorites = () => {
		setFavorites([]);
		localStorage.removeItem("favorites");
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
		return (
			<div className="text-center p-5">
				Vous n'avez pas de bouquets favoris pour le moment.
			</div>
		);
	}

	const handleAddToCart = (bouquet: Bouquet) => {
		const savedCart = localStorage.getItem("caddy");
		const caddy: Bouquet[] = savedCart ? JSON.parse(savedCart) : [];
		caddy.push(bouquet);
		localStorage.setItem("caddy", JSON.stringify(caddy));
		showAlertMessage(`Bouquet ajouté au panier: ${bouquet.nom}`);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{showAlert && (
				<div className="fixed top-4 right-20 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg z-50">
					{alertMessage}
				</div>
			)}
			<h1 className="text-3xl text-center py-5 font-bold mb-6">
				Mes Bouquets Favoris
			</h1>
			<button
				type="button"
				onClick={() => removeAllFavorites()}
				className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4 mb-4 transition-colors cursor-pointer"
			>
				Retirer tous les bouquets
			</button>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{favoritesBouquet.map((bouquet) => (
					<div key={bouquet.id} className="bg-gray-50 ">
						<CardBouquet
							bouquet={bouquet}
							onToggleFavorite={handleRemoveFavorite}
							onAddToCart={() => handleAddToCart(bouquet)}
							isFavorite={true}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default PageFavoris;
