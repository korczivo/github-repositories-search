import React, { useCallback } from 'react';

interface TablePerPageProps {
  pageSize: number;
  handlePerPageChange: (param: number) => void;
}

export const TablePerPage = React.memo(function TablePerPage({
  pageSize,
  handlePerPageChange,
}: TablePerPageProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handlePerPageChange(+e.target.value);
    },
    [handlePerPageChange]
  );

  return (
    <div>
      <span>Results per page: </span>
      <select value={pageSize} onChange={handleChange}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
});
