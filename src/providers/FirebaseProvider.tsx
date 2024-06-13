"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSession } from "next-auth/react";
import { onAuthStateChanged, signInWithCustomToken, User } from "firebase/auth";
import { auth } from "@/firebase";

interface FirebaseContextProps {
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateWithFirebase = async () => {
      const session = await getSession();

      if ((session as any)?.customToken) {
        try {
          await signInWithCustomToken(auth, (session as any).customToken);
        } catch (error) {
          console.error("Error logging in with custom token:", error);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    authenticateWithFirebase();

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
