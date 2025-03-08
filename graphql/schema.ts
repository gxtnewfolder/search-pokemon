export const typeDefs = `#graphql 

  type Pokemon {
    id: ID!
    number: String
    name: String
    weight: Weight
    height: Height
    classification: String
    types: [String]
    resistant: [String]
    weaknesses: [String]
    fleeRate: Float
    maxCP: Int
    maxHP: Int
    image: String
  }

  type Weight {
    minimum: String
    maximum: String
  }

  type Height {
    minimum: String
    maximum: String
  }

  type Query {
    pokemon(id: ID, name: String): Pokemon
  }
`;