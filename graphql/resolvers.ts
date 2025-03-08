import { Context } from "@/pages/api/graphql";
import { gql } from "@apollo/client";

export const resolvers = {
  Query: {
    // Get Pokémon by name
    pokemon: async (_parent: any, args: { name: string }, context: Context) => {
      const { data } = await context.client.query({
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
    pokemons: async (_parent: any, _args: any, context: Context) => {
      const { data } = await context.client.query({
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