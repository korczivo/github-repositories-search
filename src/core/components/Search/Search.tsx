import { ChangeEvent, useState } from 'react';
import { INPUT_REQUIRED } from 'core/helpers/formsMessages';

interface SearchProps {
  searchTerm: string;
  onChange: (param: string) => void;
}

export function Search({ searchTerm, onChange }: SearchProps) {
  const [error, setError] = useState<string | null>();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim() !== '') {
      onChange(value);
      setError(null);
    } else {
      setError(INPUT_REQUIRED);
    }
  };

  return (
    <>
      <label htmlFor="search">
        Search:
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </label>
      {error}
    </>
  );
}
