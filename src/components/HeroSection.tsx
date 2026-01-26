import { Link } from "react-router-dom";
import background from "../assets/background.png";

function HeroSection() {
	return (
		<section
			className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center"
			style={{ backgroundImage: `url(${background})` }}
		>
			<div className="text-center">
				<h1 className="text-5xl mb-6">Bienvenue chez Strasfleurs</h1>

				<div className="flex flex-col gap-4">
					<Link to="/choisir-bouquet">Composer votre bouquet personnalisé</Link>
					<Link to="/choisir-fleurs">Découvrir nos bouquets</Link>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
