"use client";

import { useEffect, useState } from "react";
import type { pokemon } from "@/src/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 20;

export default function Pokemon() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<pokemon[]>([]);

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);

      try {
        const offset = (page - 1) * LIMIT;
        const res = await fetch(
          `${API_URL}?limit=${LIMIT}&offset=${offset}`
        );
        const data = await res.json();

        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / LIMIT));
      } catch (error) {
        console.error("Error fetching pokemon", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pokémon Characters
      </h1>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => {
            const pokemonId = (page - 1) * LIMIT + index + 1;

            return (
              <div
                key={character.name}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={character.name}
                  className="rounded-lg mb-4 mx-auto h-32"
                />
                <h2 className="font-semibold text-lg capitalize">
                  {character.name}
                </h2>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINACIÓN */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅ Anterior
        </button>

        <span className="font-medium">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
