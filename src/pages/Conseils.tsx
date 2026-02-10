export default function Conseils() {
	const styles = [
		{
			num: 1,
			title: "L'Élégance Classique",
			subtitle: "L'Intemporel Chic",
			intro:
				"Ce style mise sur des formes pleines et des textures soyeuses. C'est le choix de la distinction qui traverse les époques.",
			fleurs:
				"La Pivoine pour sa générosité romantique ou la Rose pour sa structure parfaite.",
			feuillages:
				"Le Ruscus, avec son vert profond et brillant, souligne les fleurs sans les éclipser.",
			touche:
				"Un soupçon de Sauge pour son aspect velouté et sa couleur vert-gris qui adoucit l'ensemble.",
			conseil:
				'Un bouquet classique en cascade sublime magnifiquement les robes de bal ou les coupes "A-line" en satin.',
		},
		{
			num: 2,
			title: "L'Esprit Bohème",
			subtitle: "Naturel et Poétique",
			intro:
				"Ici, on cherche le mouvement, le flou et l'évocation d'un jardin sauvage ou d'une balade en Provence.",
			fleurs:
				"La Tulipe (pour ses courbes naturelles) et le Gerbera pour son côté solaire et authentique.",
			feuillages:
				'L\'Eucalyptus pour son port souple et la Fougère pour son aspect "sous-bois" très aérien.',
			touche:
				"La Lavande est ici indispensable pour son parfum et sa verticalité, mariée au Fenouil pour son aspect vaporeux.",
			conseil:
				"Ce style aérien accompagne parfaitement les robes fluides en mousseline ou en dentelle légère.",
		},
		{
			num: 3,
			title: "Le Look Moderne",
			subtitle: "Audace et Structure",
			intro:
				"Pour un mariage contemporain, on joue sur les contrastes de formes, les lignes graphiques et les textures inhabituelles.",
			fleurs:
				"L'Amaryllis, majestueuse et architecturale, devient la pièce maîtresse du bouquet.",
			feuillages:
				"Le Flexgrass que l'on peut tresser ou courber, et le Mahonia pour ses feuilles graphiques et rigides.",
			touche:
				"Le Romarin ou le Thym, qui apportent une texture robuste et une note olfactive puissante et originale.",
			conseil:
				"Un bouquet moderne en cascade, très étiré, est l'allié idéal des robes fourreaux ou des tailleurs-pantalons minimalistes.",
		},
	];

	return (
		<main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
			{/* Header */}
			<header className="text-center mb-8 sm:mb-12">
				<h1 className="text-2xl sm:text-3xl font-bold mb-3">
					Conseils pour choisir votre bouquet
				</h1>
				<p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
					La personnalisation du bouquet de mariée : Équilibre, Texture et
					Caractère
				</p>
			</header>

			{/* Intro */}
			<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 mb-8 sm:mb-10 max-w-3xl mx-auto">
				<p className="text-gray-700 leading-relaxed mb-4">
					Créer son bouquet, c'est définir la touche finale de sa silhouette,
					harmonieusement avec votre robe de mariée. Qu'il soit en cascade pour
					un effet majestueux, ou en rond pour plus de sobriété, le choix
					botanique est essentiel.
				</p>
				<p className="text-gray-700 leading-relaxed">
					Pour vous aider à naviguer, nous avons classé nos variétés (fleurs,
					feuillages et herbes) selon trois esthétiques fortes. Peu importe la
					palette de couleurs que vous choisirez ultérieurement, ces
					combinaisons garantissent une harmonie visuelle et sensorielle.
				</p>
			</section>

			{/* Style cards */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
				{styles.map((style) => (
					<article
						key={style.num}
						className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col"
					>
						{/* Card header */}
						<div className="flex items-center gap-3 mb-4">
							<span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
								{style.num}
							</span>
							<div>
								<h2 className="text-lg font-semibold text-gray-800 leading-tight">
									{style.title}
								</h2>
								<p className="text-sm text-emerald-600 font-medium">
									{style.subtitle}
								</p>
							</div>
						</div>

						<p className="text-gray-600 text-sm leading-relaxed mb-5">
							{style.intro}
						</p>

						{/* Details */}
						<div className="space-y-4 flex-1">
							<div className="bg-emerald-100 rounded-xl p-3.5">
								<h3 className="text-sm font-semibold text-emerald-800 mb-1">
									Les Fleurs
								</h3>
								<p className="text-sm text-emerald-700 leading-relaxed">
									{style.fleurs}
								</p>
							</div>

							<div className="bg-yellow-100 rounded-xl p-3.5">
								<h3 className="text-sm font-semibold text-gray-700 mb-1">
									Les Feuillages
								</h3>
								<p className="text-sm text-gray-600 leading-relaxed">
									{style.feuillages}
								</p>
							</div>

							<div className="bg-red-100 rounded-xl p-3.5">
								<h3 className="text-sm font-semibold text-gray-700 mb-1">
									La Touche Finale
								</h3>
								<p className="text-sm text-gray-600 leading-relaxed">
									{style.touche}
								</p>
							</div>
						</div>

						{/* Conseil */}
						<div className="mt-5 pt-4 border-t border-gray-100">
							<p className="text-sm text-gray-500 italic">
								<span className="font-semibold text-gray-600 not-italic">
									Conseil morphologie :
								</span>{" "}
								{style.conseil}
							</p>
						</div>
					</article>
				))}
			</div>

			{/* CTA section */}
			<section className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 sm:p-8 text-center max-w-3xl mx-auto">
				<h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
					Comment procéder ?
				</h2>
				<p className="text-gray-700 leading-relaxed text-sm sm:text-base">
					N'hésitez pas à nous envoyer une photo de votre robe. La coupe (col
					bateau, dos nu, sirène...) influence directement la tombée du bouquet.
					Ensemble, nous ajusterons la proportion de fougère pour le volume ou
					de flexgrass pour le dynamisme afin que votre bouquet soit l'extension
					de votre personnalité.
				</p>
			</section>
		</main>
	);
}
