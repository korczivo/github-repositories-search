import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableManagerProps,
  TableManagerResult,
} from '../interfaces/tableManager';

export function useTableManager({
  initialSearchTerm,
  initialPageSize,
  initialCurrentPage,
  pageParams,
}: TableManagerProps): TableManagerResult {
  const history = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

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
    pageSize,
    currentPage,
    handlePageChange,
    handlePerPageChange,
  };
}
