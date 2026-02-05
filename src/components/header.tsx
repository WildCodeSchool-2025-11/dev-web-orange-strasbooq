import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Coeuricon from "../assets/Favoris.svg";
import Logo from "../assets/logo.png";
import PanierIcon from "../assets/Panier.svg";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/LogInOutContext";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const {
		isLogin,
		isOpen,
		setIsOpen,
		formData,
		handleSubmit,
		handleChange,
		handleLogout,
		username,
	} = useAuth();

	const { getCartCount } = useCart();
	const panierCount = getCartCount();

	return (
		<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<RouterLink to="/" className="shrink-0">
						<img
							src={Logo}
							alt="Logo"
							className="h-12 sm:h-14 w-auto hover:scale-105 transition-transform duration-300"
						/>
					</RouterLink>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-2">
						<RouterLink
							to="/choisir-bouquet"
							className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-200"
						>
							Choisir un bouquet
						</RouterLink>

						<RouterLink
							to="/choisir-fleurs"
							className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-200"
						>
							Créer un bouquet
						</RouterLink>

						{/* Divider */}
						<div className="w-px h-6 bg-gray-200 mx-2" />

						{/* Icons */}
						<div className="flex items-center gap-1">
							<RouterLink
								to="/Panier"
								className="relative p-2.5 rounded-xl hover:bg-green-100 transition-colors duration-200 group"
							>
								{panierCount > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
										{panierCount}
									</span>
								)}
								<img
									src={PanierIcon}
									alt="Panier"
									className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
								/>
							</RouterLink>

							<RouterLink
								to="/Favoris"
								className="p-2.5 rounded-xl hover:bg-green-100 transition-colors duration-200 group"
							>
								<img
									src={Coeuricon}
									alt="Favoris"
									className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity"
								/>
							</RouterLink>
						</div>

						{/* Divider */}
						<div className="w-px h-8 bg-gray-200 mx-3" />

						{isLogin ? (
							<div>
								<span className="text-black font-medium">
									Welcome {username}!
								</span>
								<button
									type="button"
									onClick={handleLogout}
									className="ml-2 px-5 py-2.5 bg-red-600/80 text-white font-medium rounded-xl hover:bg-red-500 shadow-lg transition-all duration-200 cursor-pointer"
								>
									Se Déconnecter
								</button>
							</div>
						) : (
							<div>
								<button
									type="button"
									onClick={() => setIsOpen(true)}
									className="px-6 py-2 font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
								>
									Connexion
								</button>
							</div>
						)}
					</nav>

					{/* Mobile: Icons + Login + Hamburger */}
					<div className="flex md:hidden items-center gap-1">
						<RouterLink
							to="/Panier"
							className="p-2 rounded-xl hover:bg-green-100 transition-colors duration-200"
						>
							<img
								src={PanierIcon}
								alt="Panier"
								className="h-5 w-5 opacity-70"
							/>
						</RouterLink>

						<RouterLink
							to="/Favoris"
							className="p-2 rounded-xl hover:bg-green-100 transition-colors duration-200"
						>
							<img
								src={Coeuricon}
								alt="Favoris"
								className="h-5 w-5 opacity-70"
							/>
						</RouterLink>

						{/* Mobile Login/Logout Button */}
						{isLogin ? (
							<button
								type="button"
								onClick={handleLogout}
								className="px-3 py-1.5 bg-red-600/80 text-white text-sm font-medium rounded-lg hover:bg-red-500 cursor-pointer transition-all duration-200"
							>
								Se Déconnecter
							</button>
						) : (
							<button
								type="button"
								onClick={() => setIsOpen(true)}
								className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-200"
							>
								Connexion
							</button>
						)}

						{/* Hamburger Button */}
						<button
							type="button"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
							aria-label="Toggle menu"
						>
							<svg
								className="h-6 w-6 text-gray-600 cursor-pointer"
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
						isMenuOpen ? "max-h-60 mt-4" : "max-h-0"
					}`}
				>
					<nav className="flex flex-col gap-1 pb-3">
						{isLogin && (
							<span className="text-gray-800 font-medium py-2 px-4">
								Welcome {username}!
							</span>
						)}
						<RouterLink
							to="/choisir-bouquet"
							onClick={() => setIsMenuOpen(false)}
							className="text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200"
						>
							Choisir un bouquet
						</RouterLink>

						<RouterLink
							to="/choisir-fleurs"
							onClick={() => setIsMenuOpen(false)}
							className="text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200"
						>
							Créer un bouquet
						</RouterLink>
					</nav>
				</div>
			</div>

			{/* Login Modal */}
			{isOpen && (
				<div className="absolute inset-0 min-h-screen bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 py-8 overflow-y-auto">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-100 my-auto">
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
							<p className="text-gray-500 mt-1">Accédez à votre compte</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="login-username"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Nom d'utilisateur
								</label>
								<input
									id="login-username"
									type="text"
									name="username"
									value={formData.username}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
									placeholder="Votre nom d'utilisateur"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="login-email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email
								</label>
								<input
									id="login-email"
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
									placeholder="votre@email.com"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="login-password"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Mot de passe
								</label>
								<input
									id="login-password"
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
									placeholder="••••••••"
									required
								/>
							</div>

							<div className="flex gap-3 pt-2">
								<button
									type="submit"
									className="flex-1 bg-green-500 text-white py-2.5 rounded-xl font-medium hover:bg-green-600 shadow-lg shadow-green-500/25 transition-all duration-200 cursor-pointer"
								>
									Se connecter
								</button>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer"
								>
									Annuler
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</header>
	);
}
