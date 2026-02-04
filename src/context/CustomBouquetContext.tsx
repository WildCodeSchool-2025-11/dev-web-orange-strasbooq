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
    addItems: (item: Item) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    resetBouquet: () => void;
    getBouquetTotal: () => number;
}

const CustomBouquetContext = createContext<CustomBouquetType | undefined>(undefined);

export const CustomBouquetProvider = ({ children }: { children: ReactNode }) => {
    const [customBouquetItems, setCustomBouquetItems] = useState<Item[]>(() => {
        const saved = localStorage.getItem("customBouquet");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("customBouquet", JSON.stringify(customBouquetItems));
    }, [customBouquetItems]);

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
    };

    const getBouquetTotal = () => {
        return customBouquetItems.reduce((total, item) => total + (item.prix * item.quantity), 0);
    };

    return (
        <CustomBouquetContext.Provider
            value={{
                cartItems: customBouquetItems,
                addItems,
                removeFromCart,
                updateQuantity,
                resetBouquet,
                getBouquetTotal,
            }}
        >
            {children}
        </CustomBouquetContext.Provider>
    );
};

export const useCustomBouquet = () => {
    const context = useContext(CustomBouquetContext);
    if (context === undefined) {
        throw new Error("useCustomBouquet must be used within a CustomBouquetProvider");
    }
    return context;
};

