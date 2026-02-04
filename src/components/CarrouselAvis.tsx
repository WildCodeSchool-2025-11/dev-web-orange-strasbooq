import { useEffect, useState } from "react";
import data from "../../public/data.json";

function CarrouselAvis() {
	const [indexActuel, setIndexActuel] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setIndexActuel((prev) => {
					if (prev === data.avis.length - 1) {
						return 0;
					}
					return prev + 1;
				});
				setFade(true);
			}, 300);
		}, 7000);

		return () => clearInterval(timer);
	}, []);

	const precedent = () => {
		setFade(false);
		setTimeout(() => {
			if (indexActuel === 0) {
				setIndexActuel(data.avis.length - 1);
			} else {
				setIndexActuel(indexActuel - 1);
			}
			setFade(true);
		}, 300);
	};

	const suivant = () => {
		setFade(false);
		setTimeout(() => {
			if (indexActuel === data.avis.length - 1) {
				setIndexActuel(0);
			} else {
				setIndexActuel(indexActuel + 1);
			}
			setFade(true);
		}, 300);
	};

	const avisActuel = data.avis[indexActuel];

	const afficherEtoiles = (note: number) => {
		const etoiles = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= note) {
				etoiles.push(<span key={i}>⭐</span>);
			} else {
				etoiles.push(
					<span key={i} className="opacity-30">
						⭐
					</span>,
				);
			}
		}
		return etoiles;
	};

	return (
		<div className="relative max-w-3xl mx-auto px-12 group">
			<button
				type="button"
				onClick={precedent}
				className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition z-10 cursor-pointer opacity-0 hover:opacity-100 group-hover:opacity-100"
				aria-label="Avis précédent"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Précédent</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<div
				className={`bg-white p-8 rounded-lg shadow-lg transition-opacity duration-300 ${
					fade ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
						{avisActuel.nom.charAt(0)}
					</div>
					<div>
						<h3 className="font-semibold text-lg">{avisActuel.nom}</h3>
						<div className="text-yellow-500 text-sm flex">
							{afficherEtoiles(avisActuel.note)}
						</div>
					</div>
				</div>

				<p className="text-gray-700 mb-4 leading-relaxed">
					{avisActuel.commentaire}
				</p>
				<small className="text-gray-400">{avisActuel.date}</small>
			</div>

			<button
				type="button"
				onClick={suivant}
				className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition z-10 cursor-pointer opacity-0 group-hover:opacity-100"
				aria-label="Avis suivant"
			>
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Suivant</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>

			<div className="flex justify-center gap-2 mt-6">
				{data.avis.map((_, index) => (
					<button
						type="button"
						key={index}
						onClick={() => {
							setFade(false);
							setTimeout(() => {
								setIndexActuel(index);
								setFade(true);
							}, 300);
						}}
						className={`w-3 h-3 rounded-full transition cursor-pointer ${
							index === indexActuel
								? "bg-green-900"
								: "bg-gray-300 hover:bg-gray-400"
						}`}
						aria-label={`Aller à l'avis ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

export default CarrouselAvis;
