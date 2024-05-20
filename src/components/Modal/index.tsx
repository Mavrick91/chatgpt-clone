import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
	isVisible: boolean;
	onClose?: () => void;
	children: ReactNode;
}

const Modal = ({ isVisible, onClose, children }: ModalProps) => {
	return (
		<AnimatePresence>
			{isVisible && (
				<>
					<motion.div className="fixed inset-0 z-40 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
					>
						{
							<div className="overflow-hidden rounded-2xl border border-token-border-light bg-token-main-surface-primary py-2 shadow-lg will-change-[opacity,transform]">
								{onClose && (
									<button className="absolute right-0 top-0 m-2" onClick={onClose}>
										&times;
									</button>
								)}
								{children}
							</div>
						}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Modal;
