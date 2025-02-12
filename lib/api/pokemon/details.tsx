import { HtttpResponse } from "@/interfaces/http";
import { PokemonDetail } from "@/interfaces/pokemon";
import { fetchers } from "@/utils/useFetch";
import useSWR from "swr";

export const GetPokemonDetails = (
  pokemonIds: number[] | null
): HtttpResponse<PokemonDetail[]> => {
  const urls =
    pokemonIds != null && pokemonIds?.length > 0
      ? pokemonIds
          .map((item) => `https://pokeapi.co/api/v2/pokemon/${item}/`)
          .filter((item) => item != null)
      : null;
  const { data, error, isLoading } = useSWR(urls, fetchers);

  if (data == null) {
    const res: PokemonDetail[] = [];
    return {
      data: res,
      error,
      isLoading,
    };
  }

  return {
    data,
    error,
    isLoading,
  };
};
