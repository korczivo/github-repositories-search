import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RepositoriesTable } from 'features/repositories/components/RepositoriesTable';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RepositoriesTable />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
