import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/", // Replace with your GraphQL API URL
  cache: new InMemoryCache(),
});

export const resolvers = {
  Query: {
    // Get Pokémon by name
    pokemon: async (_parent: any, args: { name: string }) => {
      const { data } = await client.query({
        query: gql`
          query GetPokemon($name: String!) {
            pokemon(name: $name) {
              id
              name
              image
              types
              attacks {
                fast {
                  name
                  type
                  damage
                }
                special {
                  name
                  type
                  damage
                }
              }
              evolutions {
                id
                name
                image
              }
            }
          }
        `,
        variables: { name: args.name },
      });
      return data.pokemon;
    },

    // Get all Pokémon (limit to first 10 for performance)
    pokemons: async () => {
      const { data } = await client.query({
        query: gql`
          query GetPokemons {
            pokemons(first: 10) {
              id
              name
              image
            }
          }
        `,
      });
      return data.pokemons;
    },
  },

  Mutation: {
    // No mutations needed since we are only reading data from an external API
  },
};