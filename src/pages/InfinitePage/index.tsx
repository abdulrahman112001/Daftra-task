import React from 'react';
import { usePokemonInfiniteQuery, usePokemonDetailsFromList } from '../../hooks/usePokemonQueries';
import { Text, Button, Spinner } from '../../components/atoms';
import { PokemonGrid, ErrorMessage } from '../../components';

const InfinitePage: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = usePokemonInfiniteQuery(20);

  const allPokemonUrls = React.useMemo(() => {
    return data?.pages.flatMap(page => page.results.map(p => p.url)) || [];
  }, [data]);

  const { 
    data: pokemonDetails, 
    error: detailsError, 
    isLoading: detailsLoading 
  } = usePokemonDetailsFromList(allPokemonUrls);

  const handleRetry = () => {
    refetch();
  };

  const combinedError = error || detailsError;
  const combinedLoading = isLoading || detailsLoading;

  if (combinedLoading && !pokemonDetails?.length) {
    return (
      <div>
        <div className="page-header">
          <Text variant="heading" color="default" as="h1">
            Discover and explore Pokémon with infinite scroll
          </Text>
          <Text variant="subtitle" color="muted" className="page-subtitle">
            Powered by React Query with caching ⚡
          </Text>
        </div>
        <PokemonGrid pokemon={[]} loading={true} skeletonCount={20} />
      </div>
    );
  }

  if (combinedError && !pokemonDetails?.length) {
    return (
      <ErrorMessage 
        message={combinedError instanceof Error ? combinedError.message : 'An error occurred'} 
        onRetry={handleRetry} 
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <Text variant="heading" color="default" as="h1">
          Discover and explore Pokémon with infinite scroll
        </Text>
        <Text variant="subtitle" color="muted" className="page-subtitle">
          Powered by React Query with caching ⚡
        </Text>
      </div>

      <PokemonGrid pokemon={pokemonDetails || []} />

      {combinedError && pokemonDetails?.length && (
        <div className="load-more-error">
          <ErrorMessage 
            message={combinedError instanceof Error ? combinedError.message : 'An error occurred'} 
            onRetry={handleRetry} 
          />
        </div>
      )}

      {!combinedError && hasNextPage && (
        <div className="load-more">
          {isFetchingNextPage ? (
            <Spinner size="large" />
          ) : (
            <Button 
              variant="primary" 
              size="large"
              onClick={() => fetchNextPage()}
            >
              Load More
            </Button>
          )}
        </div>
      )}

      {!hasNextPage && pokemonDetails && pokemonDetails.length > 0 && (
        <div className="end-message">
          <Text variant="body" color="default">
            You've seen all the Pokémon! 🎉
          </Text>
        </div>
      )}
    </div>
  );
};

export default InfinitePage;