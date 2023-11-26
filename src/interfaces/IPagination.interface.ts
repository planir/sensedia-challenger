interface IPagination<T = any> {
	data: T[];
	pagination: {
		totalItems: number;
		totalPages: number;
		currentPage: number;
		itemsPerPage: number;
		startIndex: number;
		endIndex: number;
	};
}
