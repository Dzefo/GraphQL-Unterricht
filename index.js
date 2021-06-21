const { merge } = require("lodash");
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

// Importing all typDefs and resolvers from models folder
const {
  MessageTypeDefs,
  MessageResolvers,
  RoomTypeDefs,
  RoomResolvers,
  UserTypeDefs,
  UserResolvers
} = require("./models");


// Defining the root typeDefs and resolvers. The query and mutation will be extended from the model typeDefs
const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation{
    _: String
  }
`;

// creating the schema from the imported typeDefs and resolvers.
// lodash merge is used to merge the resolver objects
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, MessageTypeDefs, RoomTypeDefs, UserTypeDefs],
  resolvers: merge(MessageResolvers, RoomResolvers, UserResolvers)
});

// Creating server object with schema
const server = new ApolloServer({ schema: schema });


// Starting server on default port 4000
server.listen().then(({ url }) => {
  console.log(`Server started and listening on ${url}`);
});