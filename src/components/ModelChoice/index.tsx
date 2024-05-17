"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { useModels } from "@/providers/ModelsProvider";
import classNames from "classnames";
import { useCallback } from "react";
import BigModelIcon from "../svg/BigModelIcon";
import CheckMarkIcon from "../svg/CheckMarkIcon";
import DropdownIcon from "../svg/DropdownIcon";

const ModelChoice = () => {
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

			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="fixed left-0 top-0 min-w-max"
					style={{
						transform: "translate(272px, 56px)",
					}}
				>
					<div className="flex min-w-[340px] max-w-xs flex-col overflow-hidden rounded-2xl border border-token-border-light bg-token-main-surface-primary py-2" tabIndex={-1}>
						<div className="mb-1 px-5 pb-0 pr-4 pt-2">
							<span className="text-sm text-token-text-tertiary">Model</span>
						</div>
						{models.map((model) => (
							<button
								onClick={() => handleUpdateModel(model.id)}
								key={model.id}
								role="menuitem"
								className="group relative m-1.5 mx-2 my-0 flex grow cursor-pointer items-center gap-2.5 rounded-md p-3 !pr-3 text-sm hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] focus-visible:outline-0 dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary"
								tabIndex={-1}
							>
								<div className="flex grow items-center justify-between gap-2">
									<div>
										<div className="flex items-center gap-3">
											<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-token-main-surface-secondary">
												<BigModelIcon />
											</span>
											<div>{model.id}</div>
										</div>
									</div>
									{model.id === defaultModel && <CheckMarkIcon />}
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ModelChoice;
