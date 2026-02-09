import { useEffect, useState } from "react";

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

	useEffect(() => {
		const data = localStorage.getItem("reservations");
		if (data) {
			try {
				const parsedData = JSON.parse(data);
				// On vérifie que les données sont bien un tableau
				if (Array.isArray(parsedData)) {
					setReservations(parsedData);
				} else {
					console.error("Les données récupérées ne sont pas un tableau");
					setReservations([]);
				}
			} catch (error) {
				console.error("Erreur lors de la lecture des réservations :", error);
				setReservations([]);
			}
		}
	}, []);

	const deleteReservation = (id: string) => {
		const updated = reservations.filter((r) => r.id !== id);
		setReservations(updated);
		localStorage.setItem("reservations", JSON.stringify(updated));
	};

	return (
		<main className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
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
