import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export type Context = {
  prisma: PrismaClient;
  client: ApolloClient<any>;
};

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Apollo Client for querying external Pokémon API
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-pokemon2.vercel.app/", // Pokémon GraphQL API
    fetch,
  }),
  cache: new InMemoryCache(),
});

// Create Apollo Server
const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

// Export API handler
export default startServerAndCreateNextHandler(apolloServer, {
  context: async (_req, _res) => ({ prisma, client }),
});