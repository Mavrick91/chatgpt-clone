"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/actions/get-models";
import { useOpenAI } from "./OpenAIProvider";

type ModelsContextType = {
	models: Model[];
	defaultModel: string;
	updateModel: (model: string) => void;
};

const ModelsContext = createContext<undefined | ModelsContextType>(undefined);

const ModelsProvider = ({ children }: { children: React.ReactNode }) => {
	const [defaultModel, setDefaultModel] = useState<string>("");
	const { key, updateKey } = useOpenAI();

	const {
		data: models,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["models"],
		queryFn: () => getModels(key!),
		enabled: !!key,
	});

	useEffect(() => {
		if (models) {
			if (!sessionStorage.getItem("default-model")) {
				sessionStorage.setItem("default-model", models[0].id);
				setDefaultModel(models[0].id);
			} else {
				const sessionModel = sessionStorage.getItem("default-model");
				if (sessionModel) setDefaultModel(sessionModel);
			}
		}
	}, [models]);

	useEffect(() => {
		if (isError) {
			updateKey();
		}
	}, [isError, updateKey]);

	const updateModel = useCallback((model: string) => {
		sessionStorage.setItem("default-model", model);
		setDefaultModel(model);
	}, []);

	if (isLoading) {
		return null;
	}

	return (
		<ModelsContext.Provider
			value={{
				models: models || [],
				defaultModel,
				updateModel,
			}}
		>
			{children}
		</ModelsContext.Provider>
	);
};

const useModels = () => {
	const context = useContext(ModelsContext);

	if (context === undefined) {
		throw new Error("useModels must be used within a ModelsProvider");
	}

	return context;
};

export default ModelsProvider;
export { useModels };
