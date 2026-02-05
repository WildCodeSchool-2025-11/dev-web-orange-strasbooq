import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null as any);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [code, setCode] = useState("*****");
	const [username, setUsername] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		const savedLogin = localStorage.getItem("login");
		const savedUsername = localStorage.getItem("username");
		if (savedLogin === "connected" && savedUsername) {
			setIsLogin(true);
			setUsername(savedUsername);
		}
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password === "Fleurs") {
			localStorage.setItem("login", "connected");
			localStorage.setItem("username", formData.username);
			setIsLogin(true);
			setUsername(formData.username);
			setMessage(`Bonjour ${formData.username}`);
			setIsOpen(false);
			setFormData({ username: "", email: "", password: "" });
		} else {
			setMessage("Mot de passe incorrect");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogout = () => {
		setIsLogin(false);
		setMessage(null);
		setUsername("");
		localStorage.removeItem("login");
		localStorage.removeItem("username");
	};

	return (
		<AuthContext.Provider
			value={{
				code,
				setCode,
				isLogin,
				setIsLogin,
				isOpen,
				setIsOpen,
				formData,
				handleSubmit,
				handleChange,
				setFormData,
				message,
				handleLogout,
				username,
				setUsername,
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
