import * as React from "react";
import * as ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthWrapper from "wrappers/AuthWrapper";
import RootWrapper from "wrappers/RootWrapper";

export const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <React.Suspense fallback={null}>
          <RootWrapper />
        </React.Suspense>
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
