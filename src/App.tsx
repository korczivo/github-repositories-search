import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RepositoriesTable } from 'features/repositories/components/RepositoriesTable';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RepositoriesTable />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
