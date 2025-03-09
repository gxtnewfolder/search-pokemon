export const typeDefs = `#graphql
  type Attack {
    name: String!
    type: String!
    damage: Int!
  }

  type Attacks {
    fast: [Attack!]!
    special: [Attack!]!
  }

  type Evolution {
    id: ID!
    name: String!
    image: String
  }

  type Pokemon {
    id: ID!
    number: String
    name: String!
    weight: Weight
    height: Height
    classification: String
    types: [String!]!
    resistant: [String!]!
    weaknesses: [String!]!
    fleeRate: Float
    maxCP: Int
    maxHP: Int
    image: String!
    attacks: Attacks!
    evolutions: [Evolution!]
  }

  type Weight {
    minimum: String
    maximum: String
  }

  type Height {
    minimum: String
    maximum: String
  }

  type PokemonConnection {
    edges: [PokemonEdge!]!
    pageInfo: PageInfo!
  }

  type PokemonEdge {
    node: Pokemon!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    pokemons(first: Int!): PokemonConnection
    pokemon(id: ID, name: String): Pokemon
  }
`;