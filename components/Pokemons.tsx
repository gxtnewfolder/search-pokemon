"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POKEMONS } from "@/graphql/queries";
import { IPokemon } from "@/typings";
import { Pokemon } from "./Pokemon";
import FilterDropdown from "./FilterDropdown";

const ITEMS_PER_PAGE = 12;

export const Pokemons = () => {
  const { data, loading, error } = useQuery(GET_ALL_POKEMONS, {
    variables: { first: 151 },
  });

  // Selected Type for Filtering
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState<'paginate' | 'loadMore'>('paginate');
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_PAGE);

  // Memoize the Pokemon list
  const allPokemons = useMemo<IPokemon[]>(() => data?.pokemons || [], [data]);

  // Function to filter Pokémon based on selected type
  const filteredPokemons = useMemo(() => {
    return selectedType
      ? allPokemons.filter((pokemon: IPokemon) => pokemon.types.includes(selectedType))
      : allPokemons;
  }, [selectedType, allPokemons]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Get current page items
  const currentPokemons = useMemo(() => {
    return displayMode === 'loadMore'
      ? filteredPokemons.slice(0, loadedItems)
      : filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPokemons, startIndex, displayMode, loadedItems]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoadedItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredPokemons.length));
  };

  // Toggle display mode
  const toggleDisplayMode = () => {
    if (displayMode === 'paginate') {
      setDisplayMode('loadMore');
      setLoadedItems(ITEMS_PER_PAGE);
    } else {
      setDisplayMode('paginate');
      setCurrentPage(1);
    }
  };

  // Reset pagination when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
    setLoadedItems(ITEMS_PER_PAGE);
  }, [selectedType]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 flex items-center justify-center min-h-[400px]">
        Oops! Something went wrong...
      </div>
    );

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6">
      {/* Sidebar Filter */}
      <div className="w-full sm:w-1/4 sm:min-w-[200px]">
        <FilterDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
        
        {/* Display Mode Toggle */}
        <button
          onClick={toggleDisplayMode}
          className="mt-4 w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Switch to {displayMode === 'paginate' ? 'Load More' : 'Pages'}
        </button>
      </div>

      {/* Pokémon List */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentPokemons.map((pokemon: IPokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} attacks={pokemon.attacks} />
          ))}
        </div>

        {/* Pagination Controls */}
        {displayMode === 'paginate' && filteredPokemons.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-200 hover:bg-gray-50'
                } transition-colors`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Load More Button */}
        {displayMode === 'loadMore' && loadedItems < filteredPokemons.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {currentPokemons.length} of {filteredPokemons.length} Pokémon
          {selectedType ? ` of type ${selectedType}` : ''}
        </div>
      </div>
    </div>
  );
};