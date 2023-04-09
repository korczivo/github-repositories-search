import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DEFAULT_SEARCH_TERM,
  SEARCH_DEBOUNCE_TIME,
  TABLE_PAGE_SIZE,
} from 'core/helpers/constants';
import { useTableManager } from 'core/hooks/tableManager';
import { useDebounce } from 'core/hooks/useDebounce';
import { ErrorHandler } from 'core/components/ErrorHandler';
import { Search } from 'core/components/Search';
import { TablePagination } from 'core/components/TablePagination';
import { Repository, RepositoryTableHeaders } from '../interfaces';
import { useRepositoriesSearch } from '../hooks/useRepositories';

export function RepositoriesTable() {
  const location = useLocation();

  const pageParams = new URLSearchParams(location.search);
  const [repositories, setRepositories] = useState<Repository[] | undefined>(
    []
  );
  const { searchTerm, setSearchTerm, currentPage, pageSize, handlePageChange } =
    useTableManager({
      pageParams,
      initialSearchTerm: DEFAULT_SEARCH_TERM,
      initialPageSize: Number(pageParams.get('per_page')) || TABLE_PAGE_SIZE,
      initialCurrentPage: Number(pageParams.get('page')) || 1,
    });

  const debouncedSearchQuery = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);

  const { data, isLoading, isError, error } = useRepositoriesSearch(
    debouncedSearchQuery,
    String(currentPage),
    String(pageSize)
  );

  const headers: Array<RepositoryTableHeaders> = [
    { key: 'name', label: 'Name' },
    { key: 'owner', label: 'Owner' },
    { key: 'stars', label: 'Stars' },
    { key: 'created', label: 'Created' },
    { key: null, label: 'Details' },
  ];

  const pageCount = data?.total_count
    ? Math.ceil(data.total_count / pageSize)
    : null;

  useEffect(() => {
    if (!isLoading && !isError) {
      setRepositories(data?.items);
    }

    return () => setRepositories([]);
  }, [data, isError, isLoading]);

  if (isError || isLoading) {
    return <ErrorHandler isLoading={isLoading} error={error?.message} />;
  }

  return (
    <>
      <Search searchTerm={searchTerm} onChange={setSearchTerm} />
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repositories?.length ? (
            repositories.map((item) => (
              <tr key={item.id}>
                <td>{item?.name || '-'}</td>
                <td>{item?.owner.login || '-'}</td>
                <td>{item?.stargazers_count || 0}</td>
                <td>{item?.created_at}</td>
                <td>
                  {item?.html_url ? (
                    <a href={item.html_url} target="_blank" rel="noreferrer">
                      Link
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No repositories found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={pageCount}
      />
    </>
  );
}
