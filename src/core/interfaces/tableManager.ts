export interface TableManagerProps {
  initialSearchTerm: string;
  initialPageSize: number;
  initialCurrentPage: number;
}

export interface TableManagerResult {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  currentPage: number;
  pageSize: number;
}
