import React, { forwardRef } from "react";
import BigModelIcon from "@/components/svg/BigModelIcon";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import classNames from "classnames";

type Props = {
	models: Model[];
	handleUpdateModel: (modelId: string) => void;
	defaultModel: string;
	isMobile: boolean;
};

const DropdownModel = forwardRef<HTMLDivElement, Props>(({ models, handleUpdateModel, defaultModel, isMobile }, ref) => {
	return (
		<div
			ref={ref}
			className={classNames("min-w-max", {
				"absolute left-1/2 mt-2 top-full -translate-x-1/2": isMobile,
				"fixed left-0 top-0 translate-x-[272px] translate-y-[56px]": !isMobile,
			})}
		>
			<div className="flex min-w-[340px] max-w-xs flex-col overflow-hidden rounded-2xl border border-token-border-light bg-token-main-surface-primary py-2" tabIndex={-1}>
				<div className="mb-1 px-5 pb-0 pr-4 pt-2">
					<span className="text-sm text-token-text-tertiary">Model</span>
				</div>
				<div className="flex max-h-72 flex-col overflow-y-auto">
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
		</div>
	);
});

DropdownModel.displayName = "DropdownModel";

export default DropdownModel;
