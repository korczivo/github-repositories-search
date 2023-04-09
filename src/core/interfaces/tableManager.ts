import { SortBy, SortOrder } from 'core/interfaces/common';

export interface TableManagerProps {
  initialSearchTerm: string;
  initialPageSize: number;
  initialSortBy: SortBy | string;
  initialSortOrder: SortOrder | string;
  initialCurrentPage: number;
  pageParams: URLSearchParams;
}

export interface TableManagerResult {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  sortBy: SortBy | string | null;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder | string | null;
  setSortOrder: (sortOrder: SortOrder | null) => void;
  currentPage: number;
  pageSize: number;
  toggleSortDirectionAndSetKey: (key: SortBy) => SortBy;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (newPerPage: number) => void;
}
