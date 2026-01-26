import BouquetSection from "../components/BouquetSection";
import HeroSection from "../components/HeroSection";

function HomePage() {
	return (
		<div>
			<HeroSection />
			<section className="bg-[#FFC7CF] min-h-screen">
				<BouquetSection />
			</section>
		</div>
	);
}

export default HomePage;
