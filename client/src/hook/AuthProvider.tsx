"use client";
import React, { useTransition } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getAuth } from "@/service/auth";
import { useToast } from "./use-toast";
import { useMutation } from "@tanstack/react-query";
import { DBUser } from "@/lib/types";
import { getCart } from "@/service/cart";

type AuthContextType = {
  user: User | null;
  dbUser: DBUser | null;
  isMutating: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  isMutating: true,
  refetch: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDBUser] = useState<DBUser | null>(null);
  const [isMutating, setIsMutating] = useState(true);
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: getAuth,
    mutationKey: ["user"],
    onError(error) {
      setIsMutating(false);
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess(data) {
      setIsMutating(false);
      setDBUser(data);
    },
  });
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        mutate({ uid: user.uid, mobileNo: user.phoneNumber!.split("+")[1] });
        startTransition(async () => {
          const data = await getCart({ uid: user.uid });
          localStorage.setItem("cart", data.map((e) => e.productId).toString());
        });
      } else {
        setIsMutating(false);
      }
      refetch();
      setUser(user);
    });
    return () => unsuscribe();
  }, [auth]);

  const refetch = () => {
    if (user && user.phoneNumber) {
      mutate({ mobileNo: user.phoneNumber.split("+")[1], uid: user.uid });
      startTransition(async () => {
        const data = await getCart({ uid: user.uid });
        localStorage.setItem("cart", data.map((e) => e.productId).toString());
      });
    } else {
      setDBUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, dbUser, isMutating: isMutating || isLoading, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}
