import { useState } from 'react';
import {
  TableManagerProps,
  TableManagerResult,
} from '../interfaces/tableManager';

export function useTableManager({
  initialSearchTerm,
  initialPageSize,
  initialCurrentPage,
}: TableManagerProps): TableManagerResult {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

  return {
    searchTerm,
    setSearchTerm,
    pageSize,
    currentPage,
  };
}
