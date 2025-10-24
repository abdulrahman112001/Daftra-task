import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';

export const usePokemonQuery = (id: string) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => pokemonApi.getPokemon(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePokemonListQuery = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokemonApi.getPokemonList(limit, offset),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePokemonInfiniteQuery = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['pokemon-infinite', limit],
    queryFn: ({ pageParam = 0 }) => pokemonApi.getPokemonList(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length * limit;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePokemonDetailsFromList = (pokemonUrls: string[]) => {
  return useQuery({
    queryKey: ['pokemon-details', pokemonUrls],
    queryFn: async (): Promise<Pokemon[]> => {
      const pokemonPromises = pokemonUrls.map(async (url) => {
        const id = pokemonApi.extractIdFromUrl(url);
        return pokemonApi.getPokemon(id);
      });
      return Promise.all(pokemonPromises);
    },
    enabled: pokemonUrls.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};