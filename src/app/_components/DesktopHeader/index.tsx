import ModelChoice from "@/components/ModelChoice";

const DesktopHeader = () => {
	return (
		<div className="sticky top-0 z-10 mb-1.5 flex h-14 items-center justify-between bg-token-main-surface-primary p-3 font-semibold">
			<div className="flex items-center gap-0 overflow-hidden">
				<ModelChoice />
			</div>
		</div>
	);
};

export default DesktopHeader;
