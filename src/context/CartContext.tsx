import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Bouquet {
	id: number;
	nom: string;
	description: string;
	prix: number;
	image_url: string;
	quantity: number;
}

interface CartContextType {
	cartItems: Bouquet[];
	addToCart: (bouquet: Bouquet) => void;
	removeFromCart: (bouquetId: number) => void;
	updateQuantity: (bouquetId: number, quantity: number) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<Bouquet[]>(() => {
		const saved = localStorage.getItem("caddy");
		return saved ? JSON.parse(saved) : [];
	});

	// Save to localStorage whenever cart changes
	useEffect(() => {
		localStorage.setItem("caddy", JSON.stringify(cartItems));
	}, [cartItems]);

	// Add product to cart
	const addToCart = (bouquet: Bouquet) => {
		setCartItems((prevItems) => {
			const existingitem = prevItems.find((item) => item.id === bouquet.id);

			if (existingitem) {
				// product already in cart, increase quantity
				return prevItems.map((item) =>
					item.id === bouquet.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			} else {
				return [...prevItems, { ...bouquet, quantity: 1 }];
			}
		});
	};

	// remove product
	const removeFromCart = (bouquetId: number) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== bouquetId),
		);
	};

	// update quantity
	const updateQuantity = (bouquetId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(bouquetId);
			return;
		}

		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === bouquetId ? { ...item, quantity } : item,
			),
		);
	};

	//   clear all
	const clearCart = () => {
		setCartItems([]);
	};

	// calculate total price all products
	const getCartTotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.prix * item.quantity,
			0,
		);
	};

	// get total number of product
	const getCartCount = () => {
		return cartItems.reduce((count, item) => count + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				getCartCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// hook to use the cart context
export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
