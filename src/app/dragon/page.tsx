"use client";

import { useEffect, useState } from "react";
import { DragonBallCharacter } from "@/src/types/dragon-ball";

const API_URL = "https://dragonball-api.com/api/characters";

export default function DragonPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<DragonBallCharacter[]>([]);

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}?page=${page}`);
        const data = await res.json();

        setCharacters(data.items);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching characters", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dragon Ball Characters
      </h1>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center"
            >
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg mb-4 mx-auto h-48 object-contain"
              />
              <h2 className="font-semibold text-lg">{character.name}</h2>
              <p className="text-sm text-gray-500">{character.race}</p>
              <p className="text-sm text-gray-500">KI: {character.ki}</p>
            </div>
          ))}
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
