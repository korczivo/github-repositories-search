import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { TableManagerProps } from 'core/interfaces/tableManager';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_SEARCH_TERM, TABLE_PAGE_SIZE } from '../helpers/constants';
import { useTableManager } from './tableManager';

function RouterWrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

function setupTableManager(props?: TableManagerProps) {
  const { result } = renderHook(
    () =>
      useTableManager({
        ...props,
        initialSearchTerm: DEFAULT_SEARCH_TERM,
        initialPageSize: TABLE_PAGE_SIZE,
        initialCurrentPage: 1,
        initialSortBy: 'name',
        initialSortOrder: 'asc',
        pageParams: new URLSearchParams(),
      }),
    {
      wrapper: RouterWrapper,
    }
  );

  return { result };
}

describe('useTableManager', () => {
  it('should set initial values', () => {
    const { result } = setupTableManager();

    expect(result.current.searchTerm).toBe(DEFAULT_SEARCH_TERM);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should update search term', () => {
    const { result } = setupTableManager();

    act(() => {
      result.current.setSearchTerm(DEFAULT_SEARCH_TERM);
    });

    expect(result.current.searchTerm).toBe(DEFAULT_SEARCH_TERM);
  });

  it('should update page size', () => {
    const { result } = setupTableManager();

    act(() => {
      result.current.handlePerPageChange(20);
    });

    expect(result.current.pageSize).toBe(20);
  });

  it('should update current page', () => {
    const { result } = setupTableManager();

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  it('should toggle sort direction and set key', () => {
    const { result } = setupTableManager();

    act(() => {
      result.current.toggleSortDirectionAndSetKey('name');
    });

    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('desc');

    act(() => {
      result.current.toggleSortDirectionAndSetKey('name');
    });

    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');
  });

  it('should set the sort key and order when a new key is selected', () => {
    const { result } = setupTableManager();

    act(() => {
      result.current.toggleSortDirectionAndSetKey('name');
      result.current.toggleSortDirectionAndSetKey('owner');
    });

    expect(result.current.sortBy).toBe('owner');
    expect(result.current.sortOrder).toBe('asc');
  });
});
