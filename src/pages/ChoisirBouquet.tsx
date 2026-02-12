// src/pages/ChoisirBouquet.tsx
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import { useCart } from "../context/CartContext";
import CardBouquet from "./CardBouquet";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
	Color: string[];
	isCustom?: boolean;
}

export default function ChoisirBouquet() {
	const [bouquets, setBouquets] = useState<Bouquet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const { addToCart } = useCart();

	const [filters, setFilters] = useState({
		colors: [] as string[],
		priceRange: { min: 0, max: 150 },
		searchTerm: "",
	});
	const [showFilters, setShowFilters] = useState(false);

	// ←––––– NEW ––––––
	// Liste des IDs désactivés (stockée dans le LS par le Dashboard)
	const [disabledIds] = useState<string[]>(() => {
		try {
			return JSON.parse(localStorage.getItem("disabled_products") ?? "[]");
		} catch {
			return [];
		}
	});
	// ←–––––––––––––––

	const showAlertMessage = (message: string) => {
		setAlertMessage(message);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 5000);
	};

	// -----------------------------------------------------------------
	// FETCH DES BOUQUETS
	// -----------------------------------------------------------------
	useEffect(() => {
		const fetchBouquets = async () => {
			try {
				const response = await fetch("https://api-strasbouq.vercel.app/items");
				const data: Bouquet[] = await response.json();
				setBouquets(data);
				setLoading(false);
			} catch (err) {
				console.error("Erreur lors de la récupération des bouquets :", err);
				setError("Impossible de charger les bouquets. Veuillez réessayer.");
				setLoading(false);
			}
		};
		fetchBouquets();
	}, []);

	// -----------------------------------------------------------------
	// GESTION DES ALERTES
	// -----------------------------------------------------------------
	const handleAddToCart = (bouquet: Bouquet) => {
		addToCart({ ...bouquet, quantity: 1 });
		showAlertMessage(`Bouquet ajouté au panier: ${bouquet.nom}`);
	};

	// -----------------------------------------------------------------
	// FILTRAGE
	// -----------------------------------------------------------------
	const filteredBouquets = bouquets.filter((bouquet) => {
		const matchesColor =
			filters.colors.length === 0 ||
			filters.colors.some((color) => bouquet.Color.includes(color));

		const matchesPrice =
			bouquet.prix >= filters.priceRange.min &&
			bouquet.prix <= filters.priceRange.max;

		const matchesSearch =
			bouquet.nom.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
			bouquet.description
				.toLowerCase()
				.includes(filters.searchTerm.toLowerCase());

		return matchesColor && matchesPrice && matchesSearch;
	});

	// -----------------------------------------------------------------
	// RENDU
	// -----------------------------------------------------------------
	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p>Chargement en cours…</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p className="text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<main className="container mx-auto px-4 py-8">
			{/* Alertes */}
			{showAlert && (
				<div className="fixed top-4 right-20 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg z-50">
					{alertMessage}
				</div>
			)}

			{/* Header */}
			<header className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">
					Nos Bouquets Disponibles à la vente
				</h1>
				<p className="text-gray-600">
					Sélectionnez votre bouquet préféré et ajoutez-le à votre panier.
				</p>
			</header>

			{/* Mobile filter toggle */}
			<div className="lg:hidden mb-4">
				<button
					type="button"
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-xl transition-colors duration-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<title>filtre</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						/>
					</svg>
					{showFilters ? "Masquer les filtres" : "Afficher les filtres"}
				</button>
			</div>

			{/* Layout principal */}
			<div className="flex flex-col lg:flex-row gap-6">
				{/* Sidebar – filtres */}
				<aside
					className={`shrink-0 lg:sticky lg:top-24 lg:self-start ${
						showFilters ? "block" : "hidden"
					} lg:block`}
				>
					<Filters filters={filters} setFilters={setFilters} />
				</aside>

				{/* Grid des bouquets */}
				<section className="flex-1">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredBouquets.map((bouquet) => (
							<CardBouquet
								key={bouquet.id}
								bouquet={bouquet}
								// ----- PASSER L’INFO DE STOCK -----
								isDisabled={disabledIds.includes(String(bouquet.id))}
								// ---------------------------------
								onToggleFavorite={() => {
									/* … ton code favorite … */
								}}
								onAddToCart={() => handleAddToCart(bouquet)}
								isFavorite={false} // (ou ta logique actuelle)
							/>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}
