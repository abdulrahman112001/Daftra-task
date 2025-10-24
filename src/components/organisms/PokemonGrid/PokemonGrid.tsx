import React from 'react';
import { PokemonCard, PokemonCardSkeleton } from '../../molecules';
import type { Pokemon } from '../../../types/pokemon';

export interface PokemonGridProps {
  pokemon: Pokemon[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemon,
  loading = false,
  skeletonCount = 20,
  className = '',
}) => {
  return (
    <div className={`pokemon-grid ${className}`}>
      {loading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <PokemonCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : (
        pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))
      )}
    </div>
  );
};

export default PokemonGrid;