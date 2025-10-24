
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary, SuspenseWrapper } from './components/hoc';
import { MainLayout } from './components/templates';
import HomePage from './pages/HomePage';
import PaginationPage from './pages/PaginationPage';
import InfinitePage from './pages/InfinitePage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import './styles/pokemon.css';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <Router>
          <MainLayout>
            <SuspenseWrapper>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pagination" element={<PaginationPage />} />
                <Route path="/infinite" element={<InfinitePage />} />
                <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SuspenseWrapper>
          </MainLayout>
        </Router>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
