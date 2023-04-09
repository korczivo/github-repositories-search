import { useQuery, UseQueryResult } from 'react-query';
import { fetchJSONData } from 'core/utils/api';
import { API_URL } from 'core/config';
import {
  QUERY_STALE_TIME,
  REPOSITORIES_CACHE_KEY,
} from 'core/helpers/constants';
import { RepositorySearchResult } from '../interfaces';

async function getRepositories(
  searchTerm: string,
  currentPage: string,
  pageSize: string
): Promise<RepositorySearchResult> {
  const params = new URLSearchParams({
    q: searchTerm,
    per_page: pageSize,
    page: currentPage,
  });

  const data = await fetchJSONData(
    `${API_URL}search/repositories?${params.toString()}`
  );
  return data;
}
export function useRepositoriesSearch(
  searchTerm: string,
  currentPage: string,
  pageSize: string
): UseQueryResult<RepositorySearchResult, Error> {
  return useQuery(
    [REPOSITORIES_CACHE_KEY, searchTerm, currentPage, pageSize],
    () => getRepositories(searchTerm, currentPage, pageSize),
    {
      staleTime: QUERY_STALE_TIME,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
}
