import appleLogo from "../assets/logos/Apple.png";
import decathlonLogo from "../assets/logos/decathlon.png";
import fnacLogo from "../assets/logos/Fnac.png";
import palaisCongresLogo from "../assets/logos/palais_congres.jpg";
import strasbourgLogo from "../assets/logos/strasbourg.jpg";
import strascooklogo from "../assets/logos/strascook.png";
import strasgiteLogo from "../assets/logos/strasgite.png";

interface BanderoleProps {
	className?: string;
}

function Banderole({ className }: BanderoleProps) {
	const partenaires = [
		{ name: "Decathlon", logo: decathlonLogo },
		{ name: "Apple", logo: appleLogo },
		{ name: "Fnac", logo: fnacLogo },
		{ name: "Palais des congrès", logo: palaisCongresLogo },
		{ name: "Strasbourg", logo: strasbourgLogo },
		{ name: "Strasgite", logo: strasgiteLogo },
		{ name: "Strascook", logo: strascooklogo },
	];

	return (
		<div className={`bg-slate-50 py-6 md:py-8 ${className || ""}`}>
			<div className="overflow-hidden">
				<h2 className="text-center text-xl font-bold mb-3 md:mb-4 px-4">
					Nos Partenaires
				</h2>
				<div className="flex gap-6 sm:gap-8 md:gap-12 animate-scroll">
					{[...partenaires, ...partenaires, ...partenaires].map(
						(partenaire, index) => (
							<img
								key={index}
								src={partenaire.logo}
								alt={`Logo ${partenaire.name}`}
								className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
							/>
						),
					)}
				</div>
			</div>
		</div>
	);
}

export default Banderole;
