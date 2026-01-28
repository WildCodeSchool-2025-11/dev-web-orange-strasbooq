import BouquetSection from "../components/BouquetSection";
import HeroSection from "../components/HeroSection";

function HomePage() {
	return (
		<div>
			<HeroSection />
			<section className="bg-[#FFC7CF] py-12">
				<BouquetSection />
			</section>
		</div>
	);
}

export default HomePage;
