import React, { useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  onPageChange: (param: number) => void;
}

export const TablePagination = React.memo(function TablePagination({
  currentPage,
  totalPages = 0,
  onPageChange,
}: PaginationProps) {
  const handleClick = useCallback(
    (page: number) => {
      if (page < 1 || !totalPages || page > totalPages) {
        return;
      }

      onPageChange(page);
    },
    [onPageChange, totalPages]
  );

  return (
    <div>
      <button type="button" onClick={() => handleClick(currentPage - 1)}>
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button type="button" onClick={() => handleClick(currentPage + 1)}>
        Next
      </button>
    </div>
  );
});
