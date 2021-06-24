const { merge } = require("lodash");
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");

// Die TypeDefs und Resolver aus den verschiedenen Models werden importiert.
const {
  MessageTypeDefs,
  MessageResolvers,
  RoomTypeDefs,
  RoomResolvers,
  UserTypeDefs,
  UserResolvers
} = require("./models");


// Hier werden die RootTypeDefs definiert. Sie werden später mit den TypeDefs aus den Models erweitert
const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation{
    _: String
  }
`;

// Aus den TypeDefs und Resolvern wird das GraphQL schema generiert
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, MessageTypeDefs, RoomTypeDefs, UserTypeDefs],
  resolvers: merge(MessageResolvers, RoomResolvers, UserResolvers)
});

// Der ApolloServer wird erstellt. Apollo ist das Framework, dass die GraphQL Logik übernimmt
const server = new ApolloServer({ schema: schema });


// Der Server wird auf dem Standard Port 4000 gestartet
server.listen().then(({ url }) => {
  console.log(`Server started and listening on ${url}`);
});