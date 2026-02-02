import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MinimalReservationDate() {
	const today = new Date();
	const reservationDate = new Date();

	if (today.getDay() === 4) {
		reservationDate.setDate(today.getDate() + 4);
	} else if (today.getDay() === 5) {
		reservationDate.setDate(today.getDate() + 4);
	} else if (today.getDay() === 6) {
		reservationDate.setDate(today.getDate() + 3);
	} else {
		reservationDate.setDate(today.getDate() + 2);
	}
	return reservationDate;
}

const isDateDisabled = ({ date, view }: { date: Date; view: string }) => {
	if (view === "month") {
		const weekendDays = [0, 6];
		const thresholdDate = MinimalReservationDate();
		return weekendDays.includes(date.getDay()) || date < thresholdDate;
	}
	return false;
};

export default function MonPanier() {
	const [selectedDate, setSelectedDate] = useState<Value>(
		MinimalReservationDate(),
	);
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");

	const {
		cartItems,
		removeFromCart,
		updateQuantity,
		clearCart,
		getCartTotal,
		getCartCount,
	} = useCart();

	const isFormValid =
		nom.trim() !== "" && prenom.trim() !== "" && selectedDate instanceof Date;

	// Empty cart state
	if (cartItems.length === 0) {
		return (
			<main className="min-h-[60vh] flex items-center justify-center px-4">
				<div className="text-center">
					<div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
						<svg
							className="w-12 h-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Panier vide</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Votre panier est vide
					</h2>
					<p className="text-gray-500 mb-6">
						Ajoutez des bouquets pour continuer
					</p>
					<Link
						to="/choisir-bouquet"
						className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
					>
						Voir nos bouquets
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-7xl mx-auto px-4 py-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
				<p className="text-gray-500 mt-1">
					{getCartCount()} article{getCartCount() > 1 ? "s" : ""} dans votre
					panier
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column - Cart Items */}
				<div className="lg:col-span-2 space-y-6">
					{/* Cart Items Section */}
					<section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-4 border-b border-gray-100 flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-800">Articles</h2>
							<button
								type="reset"
								onClick={clearCart}
								className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
							>
								Vider le panier
							</button>
						</div>

						<div className="divide-y divide-gray-100">
							{cartItems.map((item) => (
								<div key={item.id} className="p-4 flex gap-4">
									<img
										src={item.image_url}
										alt={item.nom}
										className="w-24 h-24 object-cover rounded-xl"
									/>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-gray-800 truncate">
											{item.nom}
										</h3>
										<p className="text-sm text-gray-500 mt-1 line-clamp-2">
											{item.description}
										</p>
										<p className="text-emerald-600 font-bold mt-2">
											{item.prix.toFixed(2)} €
										</p>
									</div>
									<div className="flex flex-col items-end justify-between">
										<button
											type="button"
											onClick={() => removeFromCart(item.id)}
											className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
											aria-label="Supprimer"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Supprimer l'article</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
										<div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
											<button
												type="button"
												onClick={() =>
													updateQuantity(item.id, item.quantity - 1)
												}
												className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
											>
												-
											</button>
											<span className="w-6 text-center font-semibold text-gray-800">
												{item.quantity}
											</span>
											<button
												type="button"
												onClick={() =>
													updateQuantity(item.id, item.quantity + 1)
												}
												className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"
											>
												+
											</button>
										</div>
										<p className="font-bold text-gray-800">
											{(item.prix * item.quantity).toFixed(2)} €
										</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Reservation Form Section */}
					<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Informations de réservation
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="nom"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Nom
								</label>
								<input
									type="text"
									id="nom"
									value={nom}
									onChange={(e) => setNom(e.target.value)}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
									placeholder="Votre nom"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="prenom"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Prénom
								</label>
								<input
									type="text"
									id="prenom"
									value={prenom}
									onChange={(e) => setPrenom(e.target.value)}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
									placeholder="Votre prénom"
									required
								/>
							</div>
						</div>
					</section>

					{/* Calendar Section */}
					<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Date de retrait
						</h2>
						<div className="flex flex-col sm:flex-row sm:items-start gap-6">
							<div className="flex-1">
								<Calendar
									locale="fr-FR"
									minDate={MinimalReservationDate()}
									tileDisabled={isDateDisabled}
									onChange={setSelectedDate}
									value={selectedDate}
									className="border-none! w-full! [&_.react-calendar\_\_tile--active]:bg-emerald-500! [&_.react-calendar\_\_tile--active]:text-white! [&_.react-calendar\_\_tile:hover]:bg-emerald-100!"
								/>
							</div>
							<div className="sm:w-48 p-4 bg-emerald-50 rounded-xl">
								<p className="text-sm text-emerald-700 font-medium">
									Date sélectionnée
								</p>
								<p className="text-lg font-bold text-emerald-800 mt-1">
									{selectedDate instanceof Date
										? selectedDate.toLocaleDateString("fr-FR", {
												weekday: "long",
												day: "numeric",
												month: "long",
											})
										: "Aucune date"}
								</p>
								<p className="text-xs text-emerald-600 mt-2">
									Retrait en boutique uniquement
								</p>
							</div>
						</div>
					</section>
				</div>

				{/* Right Column - Summary */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							Récapitulatif
						</h2>

						{/* Items summary */}
						<div className="space-y-3 pb-4 border-b border-gray-100">
							{cartItems.map((item) => (
								<div key={item.id} className="flex justify-between text-sm">
									<span className="text-gray-600 truncate max-w-[60%]">
										{item.nom} x{item.quantity}
									</span>
									<span className="text-gray-800 font-medium">
										{(item.prix * item.quantity).toFixed(2)} €
									</span>
								</div>
							))}
						</div>

						{/* Totals */}
						<div className="space-y-3 py-4 border-b border-gray-100">
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Sous-total</span>
								<span className="text-gray-800">
									{getCartTotal().toFixed(2)} €
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-gray-600">Retrait en boutique</span>
								<span className="text-emerald-600 font-medium">Gratuit</span>
							</div>
						</div>

						<div className="flex justify-between py-4">
							<span className="text-lg font-bold text-gray-800">Total</span>
							<span className="text-lg font-bold text-emerald-600">
								{getCartTotal().toFixed(2)} €
							</span>
						</div>

						{/* Reservation info summary */}
						{(nom || prenom || selectedDate) && (
							<div className="p-3 bg-gray-50 rounded-lg mb-4 text-sm">
								<p className="font-medium text-gray-700 mb-1">
									Réservation pour :
								</p>
								{(nom || prenom) && (
									<p className="text-gray-600">
										{prenom} {nom}
									</p>
								)}
								{selectedDate instanceof Date && (
									<p className="text-gray-600">
										Le {selectedDate.toLocaleDateString("fr-FR")}
									</p>
								)}
							</div>
						)}

						<button
							type="button"
							disabled={!isFormValid}
							className={`w-full py-3 rounded-xl font-semibold transition-all ${isFormValid ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
						>
							Confirmer la réservation
						</button>

						{!isFormValid && (
							<p className="text-xs text-gray-500 text-center mt-2">
								Veuillez remplir tous les champs
							</p>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
