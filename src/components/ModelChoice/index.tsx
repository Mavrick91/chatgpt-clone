"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useModels } from "@/providers/ModelsProvider";
import classNames from "classnames";
import { useCallback } from "react";
import DropdownModel from "@/components/DropdownModel";
import DropdownIcon from "@/components/svg/DropdownIcon";

const ModelChoice = ({ isMobile = false }: { isMobile?: boolean }) => {
	const { isDropdownOpen, toggleDropdown, dropdownRef, buttonRef } = useClickOutside();
	const { models, defaultModel, updateModel } = useModels();

	const handleUpdateModel = useCallback(
		(modelId: string) => {
			toggleDropdown();
			updateModel(modelId);
		},
		[toggleDropdown, updateModel]
	);

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				onClick={toggleDropdown}
				aria-haspopup="menu"
				aria-expanded="false"
				data-state="closed"
				className={classNames(
					"group flex cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-xl px-3 py-2 text-lg font-medium text-token-text-secondary hover:bg-token-main-surface-secondary",
					{
						"bg-token-main-surface-secondary": isDropdownOpen,
					}
				)}
			>
				<div className="text-token-text-secondary">{defaultModel}</div>
				<DropdownIcon />
			</button>

			{isDropdownOpen && <DropdownModel isMobile={isMobile} defaultModel={defaultModel} handleUpdateModel={handleUpdateModel} models={models} ref={dropdownRef} />}
		</div>
	);
};

export default ModelChoice;
