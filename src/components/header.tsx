// header.tsx
import { Link as RouterLink } from "react-router-dom";


export default function Header() {
    return (
        <header
            className="h-[100px] relative flex items-center"
            style={{ backgroundColor: "rgba(158, 42, 43, 0.6)" }}>

            <nav className="ml-auto pr-[20px] flex gap-4">
                <RouterLink to="/Accueil" className="HomePage">
                    <img
                        src="src/assets/logo.png"
                        alt="Logo"
                        className="absolute left-[20px] top-[20px] h-[120px]"
                        style={{ filter: "drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.3))" }}
                    />
                </RouterLink>
                <RouterLink to="/ChoisirBouquet" className="ChoisirBouquet">
                    Choisir un bouquet
                </RouterLink>
                <RouterLink to="/CreerBouquet" className="CreerBouquet">
                    Créer un bouquet
                </RouterLink>
                <RouterLink to="/Panier" className="Panier">
                    <img src="src/assets/Panier.png" alt="Panier" className="h-[30px]" />
                </RouterLink>
                <RouterLink to="/Favoris" className="Favoris">
                    <img src="src/assets/Favoris.png" alt="Favoris" className="h-[30px]" />
                </RouterLink>
            </nav>
        </header>
    );
}

