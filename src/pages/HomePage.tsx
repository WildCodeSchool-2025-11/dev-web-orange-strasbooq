import BouquetSection from "../components/BouquetSection";
import CarrouselAvis from "../components/CarrouselAvis";
import HeroSection from "../components/HeroSection";

function HomePage() {
	return (
		<div>
			<HeroSection />
			<section>
				<BouquetSection />
			</section>

			<section className="p-8 bg-gray-50 py-16">
				<h2 className="text-3xl font-bold text-center mb-12">
					Ce que disent nos clients
				</h2>
				<CarrouselAvis />
			</section>
		</div>
	);
}

export default HomePage;
