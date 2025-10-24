import React from 'react';
import { usePokemonListQuery, usePokemonDetailsFromList } from '../../hooks/usePokemonQueries';
import { PokemonListTemplate } from '../../components/templates';

const PaginationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const { 
    data: listData, 
    error: listError, 
    isLoading: listLoading,
    refetch: refetchList
  } = usePokemonListQuery(limit, offset);

  const pokemonUrls = listData?.results.map(p => p.url) || [];
  
  const { 
    data: pokemonDetails, 
    error: detailsError, 
    isLoading: detailsLoading,
    refetch: refetchDetails
  } = usePokemonDetailsFromList(pokemonUrls);

  const error = listError || detailsError;
  const loading = listLoading || detailsLoading;

  const handleRetry = () => {
    refetchList();
    refetchDetails();
  };

  const totalPages = listData ? Math.ceil(listData.count / limit) : 0;

  const paginationProps = listData ? {
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    hasNext: !!listData.next,
    hasPrev: !!listData.previous,
    onNext: () => setCurrentPage(prev => prev + 1),
    onPrev: () => setCurrentPage(prev => Math.max(1, prev - 1)),
  } : undefined;

  return (
    <PokemonListTemplate
      title="Discover and explore Pokémon with page controls"
      subtitle="Powered by React Query with caching ⚡"
      pokemon={pokemonDetails || []}
      loading={loading}
      error={error instanceof Error ? error.message : error || null}
      onRetry={handleRetry}
      pagination={paginationProps}
    />
  );
};

export default PaginationPage;