import React, { createContext, useContext, useState } from 'react';

// Define what a Cart Item looks like
interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage if it exists
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("luxury_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to LocalStorage whenever the cart changes
  React.useEffect(() => {
    localStorage.setItem("luxury_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, quantity: number) => {
    setCart((prevCart) => {
      const existItem = prevCart.find((x) => x._id === product._id);
      if (existItem) {
        return prevCart.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + quantity } : x
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("luxury_cart"); // Clean up storage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// This is the "useCart" hook you were asking about
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};