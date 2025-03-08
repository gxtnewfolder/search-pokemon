import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

// Create Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export API handler
export default startServerAndCreateNextHandler(apolloServer);