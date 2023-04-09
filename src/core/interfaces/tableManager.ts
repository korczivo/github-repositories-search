export interface TableManagerProps {
  initialSearchTerm: string;
  initialPageSize: number;
  initialCurrentPage: number;
  pageParams: URLSearchParams;
}

export interface TableManagerResult {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  currentPage: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (newPerPage: number) => void;
}
