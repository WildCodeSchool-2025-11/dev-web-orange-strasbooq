import mariage1 from "../assets/bouquetmariage1.jpg";
import mariage2 from "../assets/bouquetmariage2.jpg";
import mariage3 from "../assets/bouquetmariage3.jpg";
import mariage4 from "../assets/bouquetmariage4.jpg";
import jour1 from "../assets/couleur.jpg";
import jour2 from "../assets/floral.jpg";
import jour3 from "../assets/gerberarose.jpg";
import jour4 from "../assets/marguerites.jpg";
import saison2 from "../assets/printemps.jpg";
import saison3 from "../assets/roses.jpg";
import saison1 from "../assets/saison1.jpg";
import saison4 from "../assets/tulipes.jpg";

function BouquetSection() {
	return (
		<section className="mt-3">
			<div className="px-20 mb-10">
				<h2 className="mb-6 text-2xl">Les bouquets de saison</h2>
				<div className="flex gap-16">
					<img
						src={saison1}
						alt="Gerbera"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={saison2}
						alt="Printemps"
						className="fw-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={saison3}
						alt="Roses"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={saison4}
						alt="Tulipes"
						className="w-56 h-40 object-cover rounded-lg"
					/>
				</div>
			</div>

			<div className="px-20 mb-10">
				<h2 className="mb-6 text-2xl">Les bouquets du jour</h2>
				<div className="flex gap-16">
					<img
						src={jour1}
						alt="Couleur"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={jour2}
						alt="Floral"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={jour3}
						alt="Gerberarose"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={jour4}
						alt="Marguerites"
						className="w-56 h-40 object-cover rounded-lg"
					/>
				</div>
			</div>

			<div className="px-20 mb-10">
				<h2 className="mb-6 text-2xl">Les bouquets de Mariage</h2>
				<div className="flex gap-16">
					<img
						src={mariage1}
						alt="Bouquetmariage1"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={mariage2}
						alt="Bouquetmariage2"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={mariage3}
						alt="Bouquetmariage3"
						className="w-56 h-40 object-cover rounded-lg"
					/>
					<img
						src={mariage4}
						alt="Bouquetmariage4"
						className="w-56 h-40 object-cover rounded-lg"
					/>
				</div>
			</div>
		</section>
	);
}

export default BouquetSection;
