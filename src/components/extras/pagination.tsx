import React, { useEffect, useState } from "react";
import Icon from "@/components/extras/icon";
import buttons from "@/styles/buttons.module.css";

const Pagination = ({
	pagination,
	onPageChange,
}: {
	pagination: IPagination["pagination"];
	onPageChange: (page: number) => void;
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageNumbers, setPageNumbers] = useState<number[]>([]);

	const generatePageNumbers = () => {
		let start = Math.max(1, currentPage - 1);
		let end = Math.min(pagination.totalPages, start + 2);

		if (currentPage === pagination.totalPages) {
			start = Math.max(1, pagination.totalPages - 2);
			end = pagination.totalPages;
		} else if (currentPage === 1) {
			end = Math.min(pagination.totalPages, start + 2);
		}

		const newPageNumbers = Array.from(
			{ length: end - start + 1 },
			(_, index) => start + index
		);

		setPageNumbers(newPageNumbers);
	};

	useEffect(() => {
		generatePageNumbers();
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(pagination.currentPage);
		generatePageNumbers();
	}, [pagination]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		onPageChange(page);
	};
	
	return (
		<div className="flex mt-6 items-center justify-between">
			<p className="text-xs text-gray-high-medium uppercase">
				{`Total ${pagination.totalItems}`}
			</p>

			<div className="flex items-center">
				<button
					className={buttons.outlined}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}>
					Anterior
				</button>

				<button
					className={`${buttons.outlined} !px-3.5 ml-3.5`}
					onClick={() => handlePageChange(1)}>
					1
				</button>

				<p className="mx-1.5 text-gray-high-medium">...</p>

				<div
					className={`${buttons.outlined} flex !p-0 overflow-hidden cursor-pointer`}>
					{pageNumbers.map((page) => (
						<div
							className={`py-2.5 px-3.5 ${
								page === currentPage
									? "bg-gray-high-medium text-white"
									: ""
							}`}
							key={page}
							onClick={() => handlePageChange(page)}>
							{page}
						</div>
					))}
				</div>

				<p className="mx-1.5 text-gray-high-medium">...</p>

				<button
					className={`${buttons.outlined} !px-3.5 mr-3.5`}
					onClick={() => handlePageChange(pagination.totalPages)}>
					{pagination.totalPages}
				</button>

				<button
					className={buttons.outlined}
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === pagination.totalPages}>
					Próximo
				</button>
			</div>

			<div className="flex items-center">
				<p className="text-xs font-medium text-gray-high-medium w-20 uppercase mr-3">
					Saltar a la página
				</p>

				<div className="mb-3 relative">
					<select
						id="underline_select"
						className="w-10 text-sm text-gray-500 bg-transparent border-0 border-b border-gray-medium-light appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
						value={currentPage}
						onChange={(e) =>
							handlePageChange(parseInt(e.target.value, 10))
						}>
						{Array.from(
							{ length: pagination.totalPages },
							(_, index) => index + 1
						).map((page) => (
							<option
								key={page}
								value={page}>
								{page}
							</option>
						))}
					</select>

					<div className="absolute top-2.5 right-0">
						<Icon icon="chevron-down" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
