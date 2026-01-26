import { Link } from "react-router-dom";
import background from "../assets/background.png";

function HeroSection() {
	return (
		<section
			className="relative h-[50vh] w-full bg-cover bg-center flex items-center justify-center opacity-90"
			style={{ backgroundImage: `url(${background})` }}
		>
			<div className="text-center">
				<h1 className="text-5xl mb-6">
					Bienvenue chez
					<br />
					Strasfleurs
				</h1>

				<div className="flex flex-col gap-4">
					<Link
						to="/choisir-bouquet"
						className="bg-[#185227]/70 text-white px-6 py-3 rounded-lg"
					>
						Composer votre bouquet personnalisé
					</Link>
					<Link
						to="/choisir-fleurs"
						className="bg-[#185227]/70 text-white px-6 py-3 rounded-lg"
					>
						Découvrir nos bouquets
					</Link>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
