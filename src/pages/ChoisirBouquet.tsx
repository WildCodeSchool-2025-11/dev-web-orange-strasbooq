import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
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
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const { addToCart } = useCart();

	const showAlertMessage = (message: string) => {
		setAlertMessage(message);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 5000);
	};

	const [favorites, setFavorites] = useState<Bouquet[]>(() => {
		const saved = localStorage.getItem("favorites");
		return saved ? JSON.parse(saved) : [];
	});

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
		setFavorites((prev) => {
			const exists = prev.some((fav) => fav.id === bouquet.id);
			const updated = exists
				? prev.filter((fav) => fav.id !== bouquet.id)
				: [...prev, bouquet];
			localStorage.setItem("favorites", JSON.stringify(updated));
			return updated;
		});
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p>Chargement en cours...</p>
			</div>
		);
	}

	const handleAddToCart = (bouquet: Bouquet) => {
		addToCart({ ...bouquet, quantity: 1 });
		showAlertMessage(`Bouquet ajouté au panier: ${bouquet.nom}`);
	};

	return (
		<main className="container mx-auto px-4 py-8">
			{showAlert && (
				<div className="fixed top-4 right-20 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg z-50">
					{alertMessage}
				</div>
			)}
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
							onAddToCart={() => handleAddToCart(bouquet)}
							isFavorite={favorites.some((fav) => fav.id === bouquet.id)}
						/>
					))}
				</div>
			</section>
		</main>
	);
}

export default ChoisirBouquet;
