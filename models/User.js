const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const typeDef = gql`
  type User {
    id_benutzer: Int!
    benutzername: String
    passwort_hash: String
    email: String
    recht_admin: String
  }

  extend type Query {
    getAllUsers: [User]
    getUser(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return prisma.benutzer.findMany();
    },
    getUser: async (_, args) => {
      return prisma.benutzer.findFirst({
        where: { id_benutzer: args.id }
      })
    }
  }
}


module.exports = {
  typeDef,
  resolvers
}