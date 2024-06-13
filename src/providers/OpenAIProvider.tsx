"use client";

import ModalOpenAIKey from "@/components/Modal/ModalOpenAIKey";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface OpenAIContextProps {
	key: string | null;
	updateKey: (newKey?: string) => void;
}

interface OpenAIProviderProps {
	children?: ReactNode;
}

const OpenAIContext = createContext<OpenAIContextProps | undefined>(undefined);

const OpenAIProvider: React.FC<OpenAIProviderProps> = ({ children }) => {
	const [key, setKey] = useState<string | null>(() => localStorage.getItem("openAIKey"));

	const updateKey = (newKey: string | undefined) => {
		if (!newKey) {
			localStorage.removeItem("openAIKey");
			setKey(null);
			return;
		}

		localStorage.setItem("openAIKey", newKey);
		setKey(newKey);
	};

	return (
		<OpenAIContext.Provider value={{ key, updateKey }}>
			<ModalOpenAIKey />
			{children}
		</OpenAIContext.Provider>
	);
};

export default OpenAIProvider;

export const useOpenAI = () => {
	const context = useContext(OpenAIContext);
	if (context === undefined) {
		throw new Error("useOpenAI must be used within an OpenAIProvider");
	}
	return context;
};
