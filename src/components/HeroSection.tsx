import { Link } from "react-router-dom";
import background from "../assets/background.png";

function HeroSection() {
	return (
		<section className="relative h-[60vh] md:h-[50vh] w-full flex items-center justify-center shadow-xl overflow-hidden px-4">
			<img
				src={background}
				alt="Fleurs de Strasfleurs"
				className="absolute inset-0 w-full h-full object-cover opacity-90 -z-10"
			/>
			<div className="text-center">
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6 satisfy-regular">
					Bienvenue chez
					<br />
					Strasfleurs
				</h1>

				<div className="flex flex-col sm:flex-row sm:justify-center gap-3 md:gap-4 py-4 md:py-5">
					<Link
						to="/choisir-fleurs"
						className="bg-green-900 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base"
					>
						Composer votre bouquet personnalisé
					</Link>
					<Link
						to="/choisir-bouquet"
						className="bg-green-900 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base"
					>
						Découvrir nos bouquets
					</Link>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
