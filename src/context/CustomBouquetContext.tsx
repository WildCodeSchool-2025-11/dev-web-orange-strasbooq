import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Item {
	id: string;
	nom: string;
	prix: number;
	quantity: number;
	categorie: string;
}

interface CustomBouquetType {
	cartItems: Item[];
	couleur: string;
	addItems: (item: Item) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	resetBouquet: () => void;
	getBouquetTotal: () => number;
	setCouleur: (couleur: string) => void;
}

const CustomBouquetContext = createContext<CustomBouquetType | undefined>(
	undefined,
);

export const CustomBouquetProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [customBouquetItems, setCustomBouquetItems] = useState<Item[]>(() => {
		const saved = localStorage.getItem("customBouquet");
		return saved ? JSON.parse(saved) : [];
	});

	const [couleur, setCouleur] = useState<string>(() => {
		const saved = localStorage.getItem("customBouquetCouleur");
		return saved ? saved : "";
	});

	useEffect(() => {
		localStorage.setItem("customBouquet", JSON.stringify(customBouquetItems));
	}, [customBouquetItems]);

	useEffect(() => {
		localStorage.setItem("customBouquetCouleur", couleur);
	}, [couleur]);

	const addItems = (item: Item) => {
		setCustomBouquetItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.id === item.id);
			if (existingItem) {
				return prevItems.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
				);
			}
			return [...prevItems, item];
		});
	};

	const removeFromCart = (itemId: string) => {
		setCustomBouquetItems((prevItems) =>
			prevItems.filter((item) => item.id !== itemId),
		);
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		setCustomBouquetItems((prevItems) =>
			prevItems.map((item) => {
				if (item.id === itemId) {
					return { ...item, quantity };
				}
				return item;
			}),
		);
	};

	const resetBouquet = () => {
		setCustomBouquetItems([]);
		setCouleur("");
	};

	const getBouquetTotal = () => {
		return customBouquetItems.reduce(
			(total, item) => total + item.prix * item.quantity,
			0,
		);
	};

	return (
		<CustomBouquetContext.Provider
			value={{
				cartItems: customBouquetItems,
				couleur,
				addItems,
				removeFromCart,
				updateQuantity,
				resetBouquet,
				getBouquetTotal,
				setCouleur,
			}}
		>
			{children}
		</CustomBouquetContext.Provider>
	);
};

export const useCustomBouquet = () => {
	const context = useContext(CustomBouquetContext);
	if (context === undefined) {
		throw new Error(
			"useCustomBouquet must be used within a CustomBouquetProvider",
		);
	}
	return context;
};
