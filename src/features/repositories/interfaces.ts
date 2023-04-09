import { SortBy } from 'core/interfaces/common';

export interface RepositorySearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

interface Owner {
  login: string;
}
export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  created_at: string;
  owner: Owner;
  html_url: string | null;
}

export interface RepositoryTableHeaders {
  key: SortBy;
  label: string;
}
