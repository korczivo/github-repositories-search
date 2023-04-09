import { renderHook, act } from '@testing-library/react-hooks';
import { createRoot } from 'react-dom/client';
import { TableManagerProps } from 'core/interfaces/tableManager';
import React from 'react';
import { DEFAULT_SEARCH_TERM, TABLE_PAGE_SIZE } from '../helpers/constants';
import { useTableManager } from './tableManager';

function setupTableManager(props?: TableManagerProps) {
  const { result } = renderHook(() =>
    useTableManager({
      ...props,
      initialSearchTerm: DEFAULT_SEARCH_TERM,
      initialPageSize: TABLE_PAGE_SIZE,
      initialCurrentPage: 1,
      initialSortBy: 'name',
      initialSortOrder: 'asc',
      pageParams: new URLSearchParams(),
    })
  );

  return { result };
}

function TestComponent() {
  const { result } = setupTableManager();

  expect(result.current.searchTerm).toBe(DEFAULT_SEARCH_TERM);
  expect(result.current.pageSize).toBe(10);
  expect(result.current.currentPage).toBe(1);
  expect(result.current.sortBy).toBeNull();
  expect(result.current.sortOrder).toBeNull();

  return (
    <div>
      <div data-testid="search-term">{result.current.searchTerm}</div>
      <div data-testid="page-size">{result.current.pageSize}</div>
      <div data-testid="current-page">{result.current.currentPage}</div>
      <div data-testid="sort-by">{result.current.sortBy}</div>
      <div data-testid="sort-order">{result.current.sortOrder}</div>
    </div>
  );
}

describe('useTableManager', () => {
  it('should set initial values', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      return <TestComponent />;
    });
  });

  it('should update search term', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.setSearchTerm(DEFAULT_SEARCH_TERM);
      });

      expect(result.current.searchTerm).toBe(DEFAULT_SEARCH_TERM);
    });
  });

  it('should update page size', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.handlePerPageChange(20);
      });

      expect(result.current.pageSize).toBe(20);
      expect(result.current.currentPage).toBe(1);
      expect(result.current.sortBy).toBeNull();
      expect(result.current.sortOrder).toBeNull();
    });
  });

  it('should update current page', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.handlePageChange(2);
      });

      expect(result.current.pageSize).toBe(10);
      expect(result.current.currentPage).toBe(2);
      expect(result.current.sortBy).toBeNull();
      expect(result.current.sortOrder).toBeNull();
    });
  });

  it('should toggle sort direction and set key', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.toggleSortDirectionAndSetKey('name');
      });

      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('asc');

      act(() => {
        result.current.toggleSortDirectionAndSetKey('name');
      });

      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('desc');
    });
  });

  it('should set the sort key and order when a new key is selected', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.toggleSortDirectionAndSetKey('name');
        result.current.toggleSortDirectionAndSetKey('owner');
      });

      expect(result.current.sortBy).toBe('owner');
      expect(result.current.sortOrder).toBe('asc');
    });
  });

  it('should return true when sorting in ascending order', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createRoot(document.createElement('div')).render(() => {
      const { result } = setupTableManager();

      act(() => {
        result.current.toggleSortDirectionAndSetKey('name');
      });

      expect(result.current.toggleSortDirectionAndSetKey('name')).toBe(true);
    });
  });
});
