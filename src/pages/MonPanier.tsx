import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MinimalReservationDate() {
	const today = new Date();
	const reservationDate = new Date();

	if (today.getDay() === 4) {
		reservationDate.setDate(today.getDate() + 4);
		return reservationDate;
	}
	if (today.getDay() === 5) {
		reservationDate.setDate(today.getDate() + 4);
		return reservationDate;
	}
	if (today.getDay() === 6) {
		reservationDate.setDate(today.getDate() + 3);
		return reservationDate;
	} else {
		reservationDate.setDate(today.getDate() + 2);
		return reservationDate;
	}
}

const isDateDisabled = ({ date, view }: { date: Date; view: string }) => {
	if (view === "month") {
		const weekendDays = [0, 6];
		const minThresholdTimestamp = MinimalReservationDate();
		const thresholdDate = new Date(minThresholdTimestamp);
		return weekendDays.includes(date.getDay()) || date < thresholdDate;
	}
	return false;
};
export default function Panier() {
	const [selectedDate, setSelectedDate] = useState<Value>(new Date());

	return (
		<main className="min-h-screen p-8 max-w-6xl mx-auto">
			<h1 className="text-3xl font-bold mb-8 text-center">Panier</h1>

			{/*FLEX WRAP */}
			<div className="flex flex-wrap gap-8 items-start">
				{/* BOX 1 : Reservation */}
				<section className="flex-1 min-w-[280px] p-6 bg-white rounded-xl shadow-sm border">
					<h2 className="text-xl font-bold mb-6">Ma réservation</h2>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="nom"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Nom
							</label>
							<input
								type="text"
								id="nom"
								className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
								placeholder="Votre nom"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="prenom"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Prénom
							</label>
							<input
								type="text"
								id="prenom"
								className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
								placeholder="Votre prénom"
								required
							/>
						</div>
					</div>
				</section>

				{/* BOX 2 : Calendar */}
				<section className="flex-1 min-w-[320px] p-6 bg-white rounded-xl shadow-sm border">
					<h2 className="text-xl font-bold mb-6">Sélectionnez une date</h2>
					<div className="flex justify-center">
						<Calendar
							locale="fr-FR"
							minDate={MinimalReservationDate()}
							tileDisabled={isDateDisabled}
							onChange={setSelectedDate}
							value={selectedDate}
							className="border-none"
						/>
					</div>
					<p className="mt-4 text-sm text-center text-gray-600 italic">
						Date sélectionnée :{" "}
						{selectedDate instanceof Date
							? selectedDate.toLocaleDateString("fr-FR")
							: "Aucune date"}
					</p>
				</section>

				{/* BOX 3 : Order summary */}
				<section className="w-full lg:flex-1 min-w-[320px] p-6 bg-gray-50 rounded-xl border">
					<h2 className="text-xl font-bold mb-4 text-center">Mon bouquet</h2>
					<img
						src="bouquetSelectionne"
						alt="Bouquet"
						className="w-32 h-32 object-cover mx-auto mb-6 rounded-full shadow-md"
					/>

					{/* Internal Flex */}
					<div className="flex flex-wrap justify-between gap-6 border-t pt-4">
						<div className="min-w-[140px]">
							<h3 className="font-bold text-blue-600 mb-2">Choix</h3>
							<p className="text-sm">Fleur(s) : ........</p>
							<p className="text-sm">Couleur(s) : ........</p>
							<p className="text-sm">Feuillage(s) : ........</p>
						</div>

						<div className="min-w-[140px] border-l pl-6">
							<h3 className="font-bold text-green-600 mb-2">Total à payer</h3>
							<p className="text-lg font-semibold">Montant : 45,00 €</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
