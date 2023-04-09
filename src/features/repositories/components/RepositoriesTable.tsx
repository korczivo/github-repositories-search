import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { TablePerPage } from 'core/components/TablePerPage';
import { SortBy } from 'core/interfaces/common';
import { getDisplayDate } from 'core/helpers/helpers';
import { Repository, RepositoryTableHeaders } from '../interfaces';
import { useRepositoriesSearch } from '../hooks/useRepositories';

export function RepositoriesTable() {
  const location = useLocation();
  const history = useNavigate();
  const pageParams = new URLSearchParams(location.search);

  const [repositories, setRepositories] = useState<Repository[] | undefined>(
    []
  );
  const {
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handlePerPageChange,
    currentPage,
    toggleSortDirectionAndSetKey,
    sortOrder,
    sortBy,
    pageSize,
  } = useTableManager({
    pageParams,
    initialSearchTerm: DEFAULT_SEARCH_TERM,
    initialPageSize: Number(pageParams.get('per_page')) || TABLE_PAGE_SIZE,
    initialSortBy: pageParams.get('sort_by'),
    initialSortOrder: pageParams.get('sort_order'),
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

  const sortRepositories = (key: SortBy | string) => {
    const isAscending = sortBy === key && sortOrder === 'asc';
    if (repositories?.length) {
      return [...repositories].sort((a, b) => {
        let result = 0;
        switch (key) {
          case 'name':
            result = a.name.localeCompare(b.name);
            break;
          case 'owner':
            result = a.owner.login.localeCompare(b.owner.login);
            break;
          case 'stars':
            result = a.stargazers_count - b.stargazers_count;
            break;
          case 'created':
            result =
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime();
            break;
          default:
            break;
        }
        return isAscending ? result : -result;
      });
    }
    return [];
  };

  const handleHeaderClick = (key: SortBy) => {
    const isAscending = toggleSortDirectionAndSetKey(key);
    const result = sortRepositories(isAscending);

    pageParams.set('sort_by', String(key));
    pageParams.set('sort_order', !isAscending ? 'asc' : 'desc');
    history({ search: pageParams.toString() });

    setRepositories(result);
  };

  const pageCount = data?.total_count
    ? Math.ceil(data.total_count / pageSize)
    : null;

  const sortedRepositories = useMemo(() => {
    return sortRepositories(sortBy);
  }, [sortBy, sortOrder, repositories]);

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
              <th
                key={header.key}
                onClick={
                  header.key !== null
                    ? () => handleHeaderClick(header.key)
                    : undefined
                }
              >
                {header.label}
                {(sortOrder === 'asc' || sortOrder === 'desc') &&
                  sortBy === header.key &&
                  sortOrder}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRepositories?.length ? (
            sortedRepositories.map((item) => (
              <tr key={item.id}>
                <td>{item?.name || '-'}</td>
                <td>{item?.owner.login || '-'}</td>
                <td>{item?.stargazers_count || 0}</td>
                <td>{getDisplayDate(item?.created_at)}</td>
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
      <TablePerPage
        pageSize={pageSize}
        handlePerPageChange={handlePerPageChange}
      />
      <TablePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={pageCount}
      />
    </>
  );
}
