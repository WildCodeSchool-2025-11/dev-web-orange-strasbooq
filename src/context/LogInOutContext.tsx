import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null as any);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [code, setCode] = useState("****");
	const [isLogin, setIsLogin] = useState(false);
	const [message, setMessage] = useState(null);
	const [currentUser, setCurrentUser] = useState(false);

	const handleLogin = () => {
		if (code === "Fleurs") {
			localStorage.setItem("login", "connected");
			setIsLogin(true);
			setMessage("Tu es connecté");
			return;
		}
		setMessage("Erreur de mot de passe");
		setIsLogin(false);
	};

	const handleLogout = () => {
		setIsLogin(false);
		setMessage(null);
		localStorage.removeItem("login");
	};

	return (
		<AuthContext.Provider
			value={{
				code,
				setCode,
				isLogin,
				setIsLogin,
				currentUser,
				setCurrentUser,
				message,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const value = useContext(AuthContext);
	if (value === null) {
		throw new Error("useAuth has to be used within <AuthProvider>");
	}

	return value;
};
