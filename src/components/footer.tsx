import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
	return (
		<footer
			className="h-[267px] absolute bottom-0 left-0 right-0 flex items-center"
			style={{ backgroundColor: "#185227" }}
		>
			<nav className="m-auto pr-[20px] flex gap-4">
				<RouterLink to="/" className="footerLink absolute right-10 bottom-10">
					Accueil
				</RouterLink>
			</nav>
			<img
				src="src/assets/footerLogo.png"
				alt="Footer Logo"
				className="absolute bottom-10 left-0 right-0 m-auto h-[100px]"
				style={{ filter: "drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.3))" }}
			></img>
		</footer>
	);
}
