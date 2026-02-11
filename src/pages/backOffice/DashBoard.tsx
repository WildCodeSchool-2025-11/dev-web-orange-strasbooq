import { useEffect, useState } from "react";

const RESTRICTED_DATES_KEY = "restricted_dates";

interface RestrictedDate {
	date: string; // format ISO YYYY-MM-DD
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

export default function DashBoard() {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [restrictedDates, setRestrictedDates] = useState<RestrictedDate[]>([]);
	const [newDate, setNewDate] = useState("");
	const [newType, setNewType] = useState<"closed" | "full">("closed");

	useEffect(() => {
		const dataRes = localStorage.getItem("reservations");
		if (dataRes) {
			try {
				const parsedRes = JSON.parse(dataRes);
				if (Array.isArray(parsedRes)) setReservations(parsedRes);
			} catch (e) {
				console.error("Erreur réservations:", e);
			}
		}
		const dataDates = localStorage.getItem(RESTRICTED_DATES_KEY);
		if (dataDates) {
			try {
				const parsedDates = JSON.parse(dataDates);
				if (Array.isArray(parsedDates)) {
					setRestrictedDates(parsedDates);
				}
			} catch (e) {
				console.error("Erreur dates restreintes:", e);
			}
		}
		const data = localStorage.getItem("reservations");
		console.log("Données brutes du localStorage:", data); // AJOUTE CECI
		if (data) {
			try {
				const parsedData = JSON.parse(data);
				console.log("Données parsées:", parsedData); // AJOUTE CECI
				if (Array.isArray(parsedData)) {
					setReservations(parsedData);
				}
			} catch (error) {
				console.error("Erreur JSON:", error);
			}
		}
	}, []);

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

	const deleteReservation = (id: string) => {
		const updated = reservations.filter((r) => r.id !== id);
		setReservations(updated);
		localStorage.setItem("reservations", JSON.stringify(updated));
	};

	return (
		<main className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
			<section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
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

				<div className="flex flex-wrap gap-2">
					{restrictedDates.map((d) => (
						<div
							key={d.date}
							className={`flex items-center gap-2 px-3 py-1 rounded-full border ${d.type === "closed" ? "bg-red-100 border-red-200 text-red-800" : "bg-orange-100 border-orange-200 text-orange-800"}`}
						>
							<span>
								{new Date(d.date).toLocaleDateString("fr-FR")} -{" "}
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
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
				<span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium">
					{Array.isArray(reservations) ? reservations.length : 0} Réservations
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
						{/* Sécurité : on vérifie que reservations est un tableau avant le .map */}
						{Array.isArray(reservations) &&
							reservations.map((res) => (
								<tr key={res.id} className="hover:bg-gray-50 transition-colors">
									<td className="p-4">
										<p className="font-bold text-gray-800 uppercase">
											{res.client?.nom}
										</p>
										<p className="text-sm text-gray-500">
											{res.client?.prenom}
										</p>
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

				{(!reservations || reservations.length === 0) && (
					<div className="p-12 text-center text-gray-500">
						Aucune réservation pour le moment.
					</div>
				)}
			</div>
		</main>
	);
}
