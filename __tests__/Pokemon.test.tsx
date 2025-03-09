import { render, screen } from '@testing-library/react';
import { Pokemon } from '@/components/Pokemon';
import '@testing-library/jest-dom';

// Mock Pokemon data
const mockBulbasaur = {
  id: "UG9rZW1vbjowMDE=",
  number: "001",
  name: "Bulbasaur",
  weight: {
    minimum: "6.04kg",
    maximum: "7.76kg",
  },
  height: {
    minimum: "0.61m",
    maximum: "0.79m",
  },
  classification: "Seed Pokémon",
  types: ["Grass", "Poison"],
  resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  fleeRate: 0.1,
  maxCP: 951,
  maxHP: 1071,
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  attacks: {
    fast: [
      { name: "Tackle", type: "Normal", damage: 12 },
      { name: "Vine Whip", type: "Grass", damage: 7 },
    ],
    special: [
      { name: "Power Whip", type: "Grass", damage: 70 },
      { name: "Seed Bomb", type: "Grass", damage: 40 },
      { name: "Sludge Bomb", type: "Poison", damage: 55 },
    ],
  },
};

const mockCharmander = {
  id: "UG9rZW1vbjowMDQ=",
  number: "004",
  name: "Charmander",
  weight: {
    minimum: "7.44kg",
    maximum: "9.56kg",
  },
  height: {
    minimum: "0.53m",
    maximum: "0.67m",
  },
  classification: "Lizard Pokémon",
  types: ["Fire"],
  resistant: ["Fire", "Grass", "Steel", "Fairy"],
  weaknesses: ["Water", "Ground", "Rock"],
  fleeRate: 0.1,
  maxCP: 841,
  maxHP: 955,
  image: "https://img.pokemondb.net/artwork/charmander.jpg",
  attacks: {
    fast: [
      { name: "Ember", type: "Fire", damage: 10 },
      { name: "Scratch", type: "Normal", damage: 6 },
    ],
    special: [
      { name: "Flame Burst", type: "Fire", damage: 45 },
      { name: "Flame Charge", type: "Fire", damage: 25 },
      { name: "Flamethrower", type: "Fire", damage: 55 },
    ],
  },
};

const mockSquirtle = {
  id: "UG9rZW1vbjowMDc=",
  number: "007",
  name: "Squirtle",
  weight: {
    minimum: "7.88kg",
    maximum: "10.13kg",
  },
  height: {
    minimum: "0.44m",
    maximum: "0.56m",
  },
  classification: "Tiny Turtle Pokémon",
  types: ["Water"],
  resistant: ["Fire", "Water", "Ice", "Steel"],
  weaknesses: ["Electric", "Grass"],
  fleeRate: 0.1,
  maxCP: 891,
  maxHP: 1008,
  image: "https://img.pokemondb.net/artwork/squirtle.jpg",
  attacks: {
    fast: [
      { name: "Bubble", type: "Water", damage: 15 },
      { name: "Tackle", type: "Normal", damage: 12 },
    ],
    special: [
      { name: "Aqua Jet", type: "Water", damage: 25 },
      { name: "Aqua Tail", type: "Water", damage: 45 },
      { name: "Water Pulse", type: "Water", damage: 35 },
    ],
  },
};

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Pokemon Type Tests', () => {
  it('should render Bulbasaur with Grass type', () => {
    render(<Pokemon pokemon={mockBulbasaur} attacks={mockBulbasaur.attacks} />);
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();
  });

  it('should render Charmander with Fire type', () => {
    render(<Pokemon pokemon={mockCharmander} attacks={mockCharmander.attacks} />);
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });

  it('should render Squirtle with Water type', () => {
    render(<Pokemon pokemon={mockSquirtle} attacks={mockSquirtle.attacks} />);
    expect(screen.getByText('Water')).toBeInTheDocument();
  });

  it('should display correct Pokemon names', () => {
    const { rerender } = render(<Pokemon pokemon={mockBulbasaur} attacks={mockBulbasaur.attacks} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    rerender(<Pokemon pokemon={mockCharmander} attacks={mockCharmander.attacks} />);
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    rerender(<Pokemon pokemon={mockSquirtle} attacks={mockSquirtle.attacks} />);
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
  });

  it('should display correct Pokemon numbers', () => {
    const { rerender } = render(<Pokemon pokemon={mockBulbasaur} attacks={mockBulbasaur.attacks} />);
    expect(screen.getByText('#001')).toBeInTheDocument();

    rerender(<Pokemon pokemon={mockCharmander} attacks={mockCharmander.attacks} />);
    expect(screen.getByText('#004')).toBeInTheDocument();

    rerender(<Pokemon pokemon={mockSquirtle} attacks={mockSquirtle.attacks} />);
    expect(screen.getByText('#007')).toBeInTheDocument();
  });
}); 