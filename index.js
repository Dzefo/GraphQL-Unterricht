const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const typeDefs = gql`
  type Message {
    id_nachricht: Int!
    id_benutzer: Int!
    id_raum: Int!
    zeitstempel: String
    text: String
    raum: Raum
  }

  type Raum {
    id_raum: Int!
    name: String
  }

  type Query {
    allMessages: [Message!]!
  }
`;

const prisma = new PrismaClient();



const resolvers = {
  Query: {
    allMessages: async () => {
      let x = await prisma.nachricht.findMany();
      return x;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server started and listening on ${url}`);
});