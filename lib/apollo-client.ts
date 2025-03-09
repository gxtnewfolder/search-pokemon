import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'https://graphql-pokemon2.vercel.app/',
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          // Proper handling of pagination with edges and nodes
          keyArgs: ['first'],
          merge(existing = { edges: [], pageInfo: {} }, incoming) {
            return {
              ...incoming,
              edges: [...(existing.edges || []), ...(incoming.edges || [])],
              pageInfo: incoming.pageInfo,
            };
          },
        },
        pokemon: {
          // Cache individual Pokemon by both ID and name
          keyArgs: ['id', 'name'],
        },
      },
    },
    Pokemon: {
      // Unique identifier for Pokemon type
      keyFields: ['id'],
      fields: {
        // Ensure proper merging of nested objects
        attacks: {
          merge: true,
        },
        evolutions: {
          merge: true,
        },
      },
    },
    PokemonConnection: {
      fields: {
        edges: {
          merge: true,
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});

export default client; 