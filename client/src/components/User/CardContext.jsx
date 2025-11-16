import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // page load वर localStorage मधून cart घे
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // cart बदलल्यावर localStorage update कर
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prev => {
            const newItem = {
                ...item,
                price: Number(item.price), // ensure number
                qty: item.qty || 1         // default 1
            };

            // जर same item already cart मध्ये असेल तर qty increase करा
            const existing = prev.find(i => i.id === newItem.id && i.color === newItem.color && i.variant === newItem.variant);
            if (existing) {
                return prev.map(i =>
                    i.id === existing.id && i.color === existing.color && i.variant === existing.variant
                        ? { ...i, qty: i.qty + newItem.qty }
                        : i
                );
            }

            return [...prev, newItem];
        });
    };

    const removeFromCart = (item) => {
        setCartItems(prev =>
            prev.filter(i => !(i.id === item.id && i.color === item.color && i.variant === item.variant))
        );
    };

    const updateQty = (item, amount) => {
        setCartItems(prev =>
            prev.map(i =>
                i.id === item.id && i.color === item.color && i.variant === item.variant
                    ? { ...i, qty: Math.max(1, i.qty + amount) }
                    : i
            )
        );
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty }}>
            {children}
        </CartContext.Provider>
    );
};
