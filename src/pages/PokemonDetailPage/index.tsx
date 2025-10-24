import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemonQuery } from '../../hooks/usePokemonQueries';
import { Spinner, Text } from '../../components/atoms';
import { ErrorMessage } from '../../components/molecules';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, error, isLoading, refetch } = usePokemonQuery(id!);

  if (isLoading) {
    return (
      <div className="container">
        <div className="pokemon-detail-loading">
          <Spinner size="large" />
          <Text variant="body" color="default">Loading Pokemon details...</Text>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="container">
        <ErrorMessage 
          message={error instanceof Error ? error.message : 'Pokemon not found'} 
          onRetry={() => refetch()} 
        />
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return colors[type] || '#68A090';
  };

  const formatStatName = (name: string) => {
    return name
      .replace('-', ' ')
      .replace('special', 'sp.')
      .toUpperCase();
  };

  return (
    <div className="container">
      <div className="pokemon-detail">
        <div className="pokemon-detail__header">
          <Link to="/pagination" className="back-link">
            ← Back to List
          </Link>
          <div className="pokemon-detail__title">
            <span className="pokemon-detail__icon">⚡</span>
            Pokédex
          </div>
          <div className="pokemon-detail__id">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
        </div>

        <div className="pokemon-detail__content">
          <div className="pokemon-detail__image">
            <img 
              src={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default} 
              alt={pokemon.name}
              loading="lazy"
            />
          </div>

          <div className="pokemon-detail__info">
            <h1 className="pokemon-detail__name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>

            <div className="pokemon-detail__types">
              {pokemon.types.map((type, index) => (
                <span 
                  key={index}
                  className="pokemon-type"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="pokemon-detail__abilities">
              <h3>Types</h3>
              <div className="abilities-list">
                {pokemon.types.map((type, index) => (
                  <span key={index} className="ability-item">
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pokemon-detail__measurements">
              <div className="measurement">
                <span className="measurement__value">{(pokemon.height / 10).toFixed(1)} m</span>
                <span className="measurement__label">Height</span>
              </div>
              <div className="measurement">
                <span className="measurement__value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                <span className="measurement__label">Weight</span>
              </div>
            </div>

            <div className="pokemon-detail__stats">
              <h3>Base Stats</h3>
              <div className="stats-list">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-name">{formatStatName(stat.stat.name)}</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar__fill"
                        style={{ 
                          width: `${(stat.base_stat / 200) * 100}%`,
                          backgroundColor: stat.base_stat > 100 ? '#4CAF50' : stat.base_stat > 50 ? '#FF9800' : '#F44336'
                        }}
                      ></div>
                    </div>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pokemon-detail__experience">
              <h3>Base Experience</h3>
              <div className="experience-value">
                {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)} XP
              </div>
            </div>

            <div className="query-info">
              <p className="query-badge">⚡ Cached with React Query</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;