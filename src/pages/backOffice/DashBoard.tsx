/* src/pages/backOffice/DashBoard.tsx */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RESTRICTED_DATES_KEY = "restricted_dates";

interface RestrictedDate {
	date: string; // ISO YYYY‑MM‑DD
	type: "closed" | "full";
}

interface Reservation {
	id: string;
	client: { nom: string; prenom: string };
	dateRetrait: string;
	articles: any[];
	total: number;
	dateCommande: string;
	statut: string;
}

interface Item {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
}

/* --------------------------------------------------------------
   Dashboard
   -------------------------------------------------------------- */
export default function DashBoard() {
	/* -------------------- États -------------------- */
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [restrictedDates, setRestrictedDates] = useState<RestrictedDate[]>([]);
	const [newDate, setNewDate] = useState("");
	const [newType, setNewType] = useState<"closed" | "full">("closed");
	const [disabledIds, setDisabledIds] = useState<string[]>(() => {
		// Lecture initiale du localStorage
		try {
			return JSON.parse(localStorage.getItem("disabled_products") ?? "[]");
		} catch {
			return [];
		}
	});
	const [items, setItems] = useState<Item[]>([]);

	/* -------------------- Effet de chargement -------------------- */
	useEffect(() => {
		// 1️⃣ Chargement des réservations (déjà stockées dans le LS)
		const storedRes = localStorage.getItem("reservations");
		if (storedRes) {
			try {
				const parsed = JSON.parse(storedRes);
				if (Array.isArray(parsed)) setReservations(parsed);
			} catch (e) {
				console.error("Erreur parsing réservations :", e);
			}
		}

		// 2️⃣ Chargement des dates restreintes
		const storedDates = localStorage.getItem(RESTRICTED_DATES_KEY);
		if (storedDates) {
			try {
				const parsed = JSON.parse(storedDates);
				if (Array.isArray(parsed)) setRestrictedDates(parsed);
			} catch (e) {
				console.error("Erreur parsing dates :", e);
			}
		}

		// 3️⃣ Chargement des produits (API publique)
		fetch("https://api-strasbouq.vercel.app/items")
			.then((r) => {
				if (!r.ok) throw new Error("Erreur réseau");
				return r.json();
			})
			.then((data: Item[]) => setItems(data))
			.catch((err) => console.error("Erreur fetch items :", err));
	}, []);

	/* -------------------- Fonctions utilitaires -------------------- */

	// Basculer l’état (activé / désactivé) d’un produit
	const toggleProduct = (id: number | string) => {
		const idStr = String(id);
		const updated = disabledIds.includes(idStr)
			? disabledIds.filter((i) => i !== idStr) // retirer
			: [...disabledIds, idStr]; // ajouter

		setDisabledIds(updated);
		localStorage.setItem("disabled_products", JSON.stringify(updated));
	};

	// Ajout / suppression d’une date restreinte
	const addRestrictedDate = () => {
		if (!newDate) return;
		const updated = [...restrictedDates, { date: newDate, type: newType }];
		setRestrictedDates(updated);
		localStorage.setItem(RESTRICTED_DATES_KEY, JSON.stringify(updated));
		setNewDate("");
	};
	const removeRestrictedDate = (dateStr: string) => {
		const updated = restrictedDates.filter((d) => d.date !== dateStr);
		setRestrictedDates(updated);
		localStorage.setItem(RESTRICTED_DATES_KEY, JSON.stringify(updated));
	};

	// Suppression d’une réservation
	const deleteReservation = (id: string) => {
		const updated = reservations.filter((r) => r.id !== id);
		setReservations(updated);
		localStorage.setItem("reservations", JSON.stringify(updated));
	};

	/* -------------------- Rendu -------------------- */
	return (
		<main className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
			{/* ── Tableau des réservations ── */}
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Réservations</h1>
				<span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium">
					{reservations.length} réservation{reservations.length !== 1 && "s"}
				</span>
			</div>
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100">
							<th className="p-4 font-semibold text-gray-600">Client</th>
							<th className="p-4 font-semibold text-gray-600">Date Retrait</th>
							<th className="p-4 font-semibold text-gray-600">Articles</th>
							<th className="p-4 font-semibold text-gray-600">Total</th>
							<th className="p-4 font-semibold text-gray-600">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{reservations.map((res) => (
							<tr key={res.id} className="hover:bg-gray-50 transition-colors">
								<td className="p-4">
									<p className="font-bold text-gray-800 uppercase">
										{res.client?.nom}
									</p>
									<p className="text-sm text-gray-500">{res.client?.prenom}</p>
								</td>
								<td className="p-4 text-gray-700">
									{res.dateRetrait
										? new Date(res.dateRetrait).toLocaleDateString("fr-FR", {
												weekday: "short",
												day: "numeric",
												month: "long",
											})
										: "Date inconnue"}
								</td>
								<td className="p-4">
									<div className="text-sm text-gray-600">
										{res.articles?.map((art: any) => (
											<div key={art.id}>
												• {art.nom} (x{art.quantity})
											</div>
										))}
									</div>
								</td>
								<td className="p-4 font-bold text-emerald-600">
									{res.total?.toFixed(2)} €
								</td>
								<td className="p-4">
									<button
										type="button"
										onClick={() => deleteReservation(res.id)}
										className="text-red-500 hover:text-red-700 font-medium text-sm cursor-pointer"
									>
										Supprimer
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{reservations.length === 0 && (
					<div className="p-12 text-center text-gray-500">
						Aucune réservation pour le moment.
					</div>
				)}
			</div>
			{/* ── Gestion des articles ── */}
			<section className="container mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-center padding-top-24px">
					Tableau de bord – Gestion des articles
				</h1>

				{items.length === 0 ? (
					<p className="text-center text-gray-600">Chargement…</p>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{items.map((item) => {
							const isDisabled = disabledIds.includes(String(item.id));

							return (
								<div
									key={item.id}
									className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
								>
									{/* Miniature 100 × 100 */}
									<img
										src={item.image_url}
										alt={item.nom}
										className="w-[100px] h-[100px] object-cover rounded"
									/>

									{/* Infos + toggle */}
									<div className="flex-1">
										<h2 className="font-medium text-gray-800">{item.nom}</h2>
										<p className="text-sm text-gray-500">
											{item.prix.toFixed(2)} €
										</p>

										{/* Switch */}
										<label className="inline-flex items-center mt-2 cursor-pointer">
											<input
												type="checkbox"
												checked={isDisabled}
												onChange={() => toggleProduct(item.id)}
												className="sr-only peer"
											/>
											<div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-emerald-500 relative transition-colors">
												<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
											</div>
											<span className="ml-2 text-sm text-gray-700">
												{isDisabled ? "Désactivé" : "Activé"}
											</span>
										</label>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{/* Retour à l’accueil – pratique pendant le dev */}
				<div className="mt-8 text-center">
					<Link
						to="/"
						className="inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
					>
						Retour à l’accueil
					</Link>
				</div>
			</section>

			{/* ── Gestion des fermetures / disponibilités ── */}
			<section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 mt-12">
				<h2 className="text-xl font-bold mb-4">
					Gestion des fermetures et disponibilités
				</h2>

				<div className="flex flex-wrap gap-4 items-end mb-6">
					<div>
						<label className="block text-sm font-medium mb-1">Date</label>
						<input
							type="date"
							value={newDate}
							onChange={(e) => setNewDate(e.target.value)}
							className="border rounded-lg p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Type</label>
						<select
							value={newType}
							onChange={(e) => setNewType(e.target.value as "closed" | "full")}
							className="border rounded-lg p-2"
						>
							<option value="closed">Fermé</option>
							<option value="full">Complet</option>
						</select>
					</div>

					<button
						onClick={addRestrictedDate}
						className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
					>
						Ajouter
					</button>
				</div>

				{/* Badges des dates déjà enregistrées */}
				<div className="flex flex-wrap gap-2">
					{restrictedDates.map((d) => (
						<div
							key={d.date}
							className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
								d.type === "closed"
									? "bg-red-100 border-red-200 text-red-800"
									: "bg-orange-100 border-orange-200 text-orange-800"
							}`}
						>
							<span>
								{new Date(d.date).toLocaleDateString("fr-FR")} –{" "}
								{d.type === "closed" ? "Fermé" : "Complet"}
							</span>
							<button
								onClick={() => removeRestrictedDate(d.date)}
								className="font-bold"
							>
								&times;
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
