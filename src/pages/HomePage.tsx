import BouquetSection from "../components/BouquetSection";
import HeroSection from "../components/HeroSection";
import CarrousselAvis from "../components/CarrousselAvis";

function HomePage() {
	return (
		<div>
			<HeroSection />
			<section>
				<BouquetSection />
			</section>

			<section className="p-8 bg-gray-50">
				<h2 className="text-3xl font-bold text-center mb-6">
					Ce que disent nos clients
				</h2>
				<div className="max-w-2xl mx-auto">
					<CarrousselAvis />
				</div>
			</section>
		</div>
	);
}

export default HomePage;
