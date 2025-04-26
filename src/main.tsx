import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from './utils/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './components/App.tsx';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
