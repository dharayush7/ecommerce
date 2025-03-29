import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartProviderInterface {
  items: string[];
  refetch: () => void;
}

const CartContext = createContext<CartProviderInterface | null>(null);

export const useCart = () => {
  const hook = useContext(CartContext);
  if (!hook) throw new Error("Provider is not used");
  return hook;
};

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data == null || data == "") {
      setItems([]);
      return;
    }
    if (data) {
      setItems([...data.split(",")]);
    }
  }, []);

  const refetch = () => {
    const data = localStorage.getItem("cart");
    if (data == null || data == "") {
      setItems([]);
      return;
    }
    if (data) {
      setItems([...data.split(",")]);
    }
  };

  return (
    <CartContext.Provider value={{ items, refetch }}>
      {children}
    </CartContext.Provider>
  );
}
