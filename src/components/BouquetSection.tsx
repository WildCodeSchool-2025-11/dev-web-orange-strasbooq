import { Link } from "react-router-dom";
import BouquetJour1 from "../assets/BouquetJour1.webp";
import BouquetJour2 from "../assets/BouquetJour2.webp";
import BouquetJour3 from "../assets/BouquetJour3.webp";
import BouquetJour4 from "../assets/BouquetJour4.webp";
import BouquetMariage1 from "../assets/BouquetMariage1.webp";
import BouquetMariage2 from "../assets/BouquetMariage2.webp";
import BouquetMariage3 from "../assets/BouquetMariage3.webp";
import BouquetMariage4 from "../assets/BouquetMariage4.webp";
import BouquetPerso1 from "../assets/BouquetPerso1.webp";
import BouquetPerso2 from "../assets/BouquetPerso2.webp";
import BouquetPerso3 from "../assets/BouquetPerso3.webp";
import BouquetPerso4 from "../assets/BouquetPerso4.webp";
import BouquetSaison1 from "../assets/BouquetSaison1.webp";
import BouquetSaison2 from "../assets/BouquetSaison2.webp";
import BouquetSaison3 from "../assets/BouquetSaison3.webp";
import BouquetSaison4 from "../assets/BouquetSaison4.webp";
import Banderole from "./Banderole";

function BouquetSection() {
	return (
		<section className="mt-6 mb-10 px-4 md:px-8 lg:px-16">
			<div className="text-center mb-8 md:mb-10">
				<h1 className="text-2xl md:text-4xl">
					Découvrez nos bouquets par thèmes
				</h1>
				<p className="mt-4 md:mt-10 text-sm md:text-base">
					Tous nos bouquets sont réalisés à la main avec les meilleures fleurs
					de la région
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
				<div className="bg-slate-50 px-4 md:px-6 py-6 md:py-5 rounded-2xl shadow-xl">
					<h2 className="text-center mb-4 md:mb-6 text-lg md:text-2xl">
						Les bouquets de saison
					</h2>
					<div className="grid grid-cols-4 gap-2 md:gap-4">
						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetSaison1}
									alt="Eté"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet pour l'Eté
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetSaison2}
									alt="Printemps"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet pour le printemps
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetSaison3}
									alt="Hiver"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet pour l'hiver
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetSaison4}
									alt="automne"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet pour l'automne
								</p>
							</div>
						</Link>
					</div>
				</div>

				<div className="bg-slate-50 px-4 md:px-10 py-6 md:py-8 rounded-2xl shadow-xl">
					<h2 className="text-center mb-4 md:mb-6 text-lg md:text-2xl">
						Les bouquets du jour
					</h2>
					<div className="grid grid-cols-4 gap-2 md:gap-4">
						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetJour1}
									alt="Couleur"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet Coloré
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetJour2}
									alt="Floral"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet Floral
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetJour3}
									alt="Gerberarose"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet Gerbera Rose
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetJour4}
									alt="Marguerites"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet Marguerites
								</p>
							</div>
						</Link>
					</div>
				</div>

				<Banderole className="col-span-2" />

				<div className="bg-slate-50 px-4 md:px-10 py-6 md:py-8 rounded-2xl shadow-xl">
					<h2 className="text-center mb-4 md:mb-6 text-lg md:text-2xl">
						Vos bouquets personnalisés
					</h2>
					<div className="grid grid-cols-4 gap-2 md:gap-4">
						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetPerso1}
									alt="Création sur mesure"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Création de Marine
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetPerso2}
									alt="Bouquet unique"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Création de Stacy
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetPerso3}
									alt="Composition florale"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Création de Yavuz
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetPerso4}
									alt="Bouquet personnalisé"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Création de Prescillia
								</p>
							</div>
						</Link>
					</div>
				</div>

				<div className="bg-slate-50 px-4 md:px-10 py-6 md:py-8 rounded-2xl shadow-xl">
					<h2 className="text-center mb-4 md:mb-6 text-lg md:text-2xl">
						Les bouquets de Mariage
					</h2>
					<div className="grid grid-cols-4 gap-2 md:gap-4">
						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetMariage1}
									alt="Bouquet de mariée classique"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet de mariée classique
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetMariage2}
									alt="Bouquet romantique"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet romantique
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetMariage3}
									alt="Bouquet bohème"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet bohème
								</p>
							</div>
						</Link>

						<Link to="/choisir-bouquet">
							<div className="overflow-hidden rounded-xl">
								<img
									src={BouquetMariage4}
									alt="Bouquet élégant"
									className="w-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
								/>
							</div>
							<div className="text-center mt-1 md:mt-2">
								<p className="font-semibold text-xs md:text-base">
									Bouquet élégant
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BouquetSection;
