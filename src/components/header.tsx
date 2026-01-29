import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// import Coeuricon from "../assets/Favoris.svg";
// import PanierIcon from "../assets/Panier.svg";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 bg-rose-300 shadow-lg">
			<div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<RouterLink to="/" className="shrink-0">
						<img
							src="src/assets/logo.png"
							alt="Logo"
							className="h-12 sm:h-16 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
						/>
					</RouterLink>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						<RouterLink
							to="/choisir-bouquet"
							className="text-black font-medium text-lg hover:text-rose-700 transition-colors duration-300 relative group"
						>
							Choisir un bouquet
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full" />
						</RouterLink>

						<RouterLink
							to="/choisir-fleurs"
							className="text-black font-medium text-lg hover:text-rose-700 transition-colors duration-300 relative group"
						>
							Créer un bouquet
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full" />
						</RouterLink>

						{/* Icons */}
						<div className="flex items-center gap-4 ml-4 pl-4 border-l border-rose-400">
							<RouterLink
								to="/Panier"
								className="p-2 rounded-full hover:bg-rose-400 transition-colors duration-300"
							>
								{/* <img src={PanierIcon} alt="Panier" className="h-7 w-7" /> */}
							</RouterLink>

							<RouterLink
								to="/Favoris"
								className="p-2 rounded-full hover:bg-rose-400 transition-colors duration-300"
							>
								{/* <img src={Coeuricon} alt="Favoris" className="h-7 w-7" /> */}
							</RouterLink>
						</div>
					</nav>

					{/* Mobile: Icons + Hamburger */}
					<div className="flex md:hidden items-center gap-2">
						<RouterLink
							to="/Panier"
							className="p-2 rounded-full hover:bg-rose-400 transition-colors duration-300"
						>
							<img src={PanierIcon} alt="Panier" className="h-6 w-6" />
						</RouterLink>

						<RouterLink
							to="/Favoris"
							className="p-2 rounded-full hover:bg-rose-400 transition-colors duration-300"
						>
							<img src={Coeuricon} alt="Favoris" className="h-6 w-6" />
						</RouterLink>

						{/* Hamburger Button */}
						<button
							type="button"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-lg hover:bg-rose-400 transition-colors duration-300"
							aria-label="Toggle menu"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-labelledby="menuIconTitle"
							>
								<title id="menuIconTitle">
									{isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
								</title>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						isMenuOpen ? "max-h-40 mt-4" : "max-h-0"
					}`}
				>
					<nav className="flex flex-col gap-2 pb-2">
						<RouterLink
							to="/choisir-bouquet"
							onClick={() => setIsMenuOpen(false)}
							className="text-black font-medium text-lg py-2 px-4 rounded-lg hover:bg-rose-400 transition-colors duration-300"
						>
							Choisir un bouquet
						</RouterLink>

						<RouterLink
							to="/choisir-fleurs"
							onClick={() => setIsMenuOpen(false)}
							className="text-black font-medium text-lg py-2 px-4 rounded-lg hover:bg-rose-400 transition-colors duration-300"
						>
							Créer un bouquet
						</RouterLink>
					</nav>
				</div>
			</div>
		</header>
	);
}
