import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text } from '../../atoms';
import type { Pokemon } from '../../../types/pokemon';

export interface PokemonCardProps {
  pokemon: Pokemon;
  className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = React.memo(({ 
  pokemon, 
  className = '' 
}) => {
  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className={`pokemon-card ${className}`}
    >
      <div className="pokemon-card__image">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          loading="lazy"
          fallback="/pokemon-placeholder.png"
        />
      </div>
      
      <Text 
        variant="heading" 
        className="pokemon-card__name"
        as="h3"
      >
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      
      <Text 
        variant="caption" 
        color="muted" 
        className="pokemon-card__id"
      >
        #{pokemon.id.toString().padStart(3, '0')}
      </Text>
    </Link>
  );
});

PokemonCard.displayName = 'PokemonCard';

export default PokemonCard;