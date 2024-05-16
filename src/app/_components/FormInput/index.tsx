import AddFileIcon from "@/components/svg/AddFileIcon";
import ButtonSend from "@/components/svg/ButtonSend";
import React from "react";

const FormInput = () => {
	return (
		<div className="w-full md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent">
			<div className="m-auto px-3 text-base md:px-5 lg:px-1 xl:px-5">
				<div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-6 lg:max-w-[40rem] xl:max-w-3xl">
					<form className="w-full">
						<div className="relative flex h-full max-w-full flex-1 flex-col">
							<div className="absolute inset-x-0 bottom-full">
								<div className="relative size-full">
									<div className="flex flex-col gap-3.5 pb-3.5 pt-2"></div>
								</div>
							</div>
							<div className="flex w-full items-center">
								<div className="flex w-full flex-col gap-1.5 rounded-[26px] bg-[#f4f4f4] p-1.5 transition-colors dark:bg-token-main-surface-secondary">
									<div className="flex items-center gap-1.5 md:gap-3.5">
										<button aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rhi:" data-state="closed">
											<div className="flex">
												<div
													className="flex size-8 items-center justify-center rounded-full text-token-text-primary focus-visible:outline-black dark:text-white dark:focus-visible:outline-white"
													aria-label="Attach files"
												>
													<AddFileIcon />
												</div>
												<input multiple type="file" tabIndex={-1} className="hidden" />
											</div>
										</button>
										<div className="flex min-w-0 flex-1 flex-col">
											<textarea
												id="prompt-textarea"
												tabIndex={0}
												data-id="root"
												dir="auto"
												rows={1}
												placeholder="Message ChatGPT"
												className="m-0 max-h-[25dvh] resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
											/>
										</div>
										<button className="mb-1 mr-1 flex size-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
											<ButtonSend />
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="relative p-2 text-center text-xs text-token-text-secondary md:px-[60px]">
				<span>ChatGPT can make mistakes. Check important info.</span>
			</div>
		</div>
	);
};

export default FormInput;
