import React from "react";
import Icon from "./icon";

const Modal = ({
	closeModal,
	handleAction,
	content,
}: {
	closeModal: () => void;
	handleAction: (...args: any) => any;
	content: string;
}) => {
	return (
		<div
			id="popup-modal"
			tabIndex={-1}
			className="flex bg-opacity-20 bg-silver overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen w-screen">
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<button
						type="button"
						onClick={closeModal}
						className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
						data-modal-hide="popup-modal">
						<Icon icon="close" className="w-4"></Icon>
						<span className="sr-only">Close modal</span>
					</button>

					<div className="p-4 md:p-5 text-center">
						<Icon icon="info" className="w-20 mx-auto mb-4"></Icon>
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							{content}
						</h3>
						<button
							data-modal-hide="popup-modal"
							type="button"
							onClick={() => {
								handleAction();
								closeModal();
							}}
							className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
							Sí, estoy seguro
						</button>
                        
						<button
							data-modal-hide="popup-modal"
							onClick={closeModal}
							type="button"
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
							No, cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
