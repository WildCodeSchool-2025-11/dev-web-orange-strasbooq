// header.tsx
import { Link as RouterLink } from "react-router-dom";


export default function Header() {
    return (
        <header
            className="h-[100px] relative flex items-center"
            style={{ backgroundColor: "rgba(158, 42, 43, 0.6)" }}>
            <img
                src="src/assets/logo.png"
                alt="Logo"
                className="absolute left-[20px] top-[20px] h-[120px]"
                style={{ filter: "drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.3))" }}
            />
            <nav className="ml-auto pr-[20px] flex gap-4">
                <RouterLink to="/" className="headerLink">
                    Accueil
                </RouterLink>
                <RouterLink to="/about" className="headerLink">
                    À propos
                </RouterLink>
            </nav>
        </header>
    );
}

