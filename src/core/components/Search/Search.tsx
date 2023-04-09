import { ChangeEvent, useState } from 'react';
import { INPUT_REQUIRED } from 'core/helpers/formsMessages';
import { Grid, Input } from 'semantic-ui-react';

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
      <Grid>
        <Grid.Column width={6}>
          <Input
            icon="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid.Column>
      </Grid>
      {error}
    </>
  );
}
