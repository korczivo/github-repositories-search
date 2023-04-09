import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SortBy, SortOrder } from 'core/interfaces/common';
import {
  TableManagerProps,
  TableManagerResult,
} from '../interfaces/tableManager';

export function useTableManager({
  initialSearchTerm,
  initialPageSize,
  initialCurrentPage,
  initialSortOrder,
  initialSortBy,
  pageParams,
}: TableManagerProps): TableManagerResult {
  const history = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);
  const [sortBy, setSortBy] = useState<SortBy | string>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder | string>(
    initialSortOrder
  );

  const toggleSortDirectionAndSetKey = (key: SortBy): SortBy => {
    if (key === sortBy) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
    return key;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pageParams.set('page', String(page));
    history({ search: pageParams.toString() });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPageSize(newPerPage);
    setCurrentPage(1);
    pageParams.set('per_page', String(newPerPage));
    history({ search: pageParams.toString() });
  };

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    pageSize,
    currentPage,
    handlePageChange,
    handlePerPageChange,
    toggleSortDirectionAndSetKey,
  };
}
