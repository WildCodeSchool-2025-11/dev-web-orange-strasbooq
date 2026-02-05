import { Link as RouterLink } from "react-router-dom";
import LogoImg from "../assets/logo.png";

export default function Footer() {
	return (
		<footer className="bg-green-900 bottom-0 w-full">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-start">
					<div className="flex justify-center sm:justify-start sm:col-span-2 lg:col-span-1">
						<img src={LogoImg} alt="Logo" className="h-20 sm:h-25" />
					</div>
					<div className="text-center sm:text-left">
						<h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg tracking-wide">
							NOTRE OFFRE
						</h4>
						<ul className="text-white/90 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Bouquets
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Fleurs
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Bouquet du Jour
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Bouquets de Saisons
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Bouquets de Mariage
							</li>
						</ul>
					</div>
					<div className="text-center sm:text-left">
						<h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg tracking-wide">
							STRASFLEURS
						</h4>
						<ul className="text-white/90 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Nos Magasins
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Presse
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Qui sommes-nous ?
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Recrutement
							</li>
							<li className="hover:text-white hover:font-bold cursor-pointer transition-colors">
								Legal
							</li>
						</ul>
					</div>
					<div className="text-center sm:text-left">
						<h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg tracking-wide">
							CONTACT
						</h4>
						<div className="text-white/90 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
							<p>StrasFleurs</p>
							<p>
								2 Rue de Bâle,
								<br />
								67100 Strasbourg, France
							</p>
							<p>+33.6.74.56.88.44</p>
						</div>
						<RouterLink
							to="/Contact"
							className="block sm:inline-block mt-4 px-4 py-2.5 sm:py-2 bg-white hover:bg-gray-200 text-green-900 font-medium rounded transition-colors text-center"
						>
							Contactez nous ici
						</RouterLink>
					</div>
				</div>
				<hr className="border-white/30 my-6 sm:my-8" />
				<p className="text-center text-white/70 text-xs sm:text-sm">
					{new Date().getFullYear()} - © All Rights Reserved - StrasFleurs
				</p>
			</div>
		</footer>
	);
}
