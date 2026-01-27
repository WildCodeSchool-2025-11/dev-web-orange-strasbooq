import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
	return (
		<footer
			className="h-[167px] absolute bottom-0 left-0 right-0 flex items-center"
			style={{ backgroundColor: "#185227" }}
		>
			<nav className="m-auto pr-[20px] flex gap-4">
				<p className="text-white absolute left-5 bottom-5">
					© 2024 Strasbooq. All rights reserved.
				</p>
				<RouterLink to="/Accueil">
					<img
						src="src/assets/footerLogo.png"
						alt="Footer Logo"
						className="absolute bottom-10 left-0 right-0 m-auto h-[100px]"
						style={{ filter: "drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.3))" }}
					></img>
				</RouterLink>
				<RouterLink
					to="/Contact"
					className="text-white absolute right-5 bottom-5 mt-5"
				>
					Contact
				</RouterLink>
				<RouterLink
					to="/Adresse"
					className="text-white absolute right-5 bottom-15 mt-5"
				>
					Adresse
				</RouterLink>
			</nav>
		</footer>
	);
}
