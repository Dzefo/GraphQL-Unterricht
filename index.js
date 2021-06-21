const { merge } = require("lodash");
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const {
  MessageTypeDefs,
  MessageResolvers,
  RoomTypeDefs,
  RoomResolvers,
  UserTypeDefs,
  UserResolvers
} = require("./models");

const rootTypeDefs = gql`
  type Query

  type Mutation
`;

const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, MessageTypeDefs, RoomTypeDefs, UserTypeDefs],
  resolvers: merge(resolvers, MessageResolvers, RoomResolvers, UserResolvers)
});

const server = new ApolloServer({ schema: schema });

server.listen().then(({ url }) => {
  console.log(`Server started and listening on ${url}`);
});