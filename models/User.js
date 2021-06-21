const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const typeDef = gql`
  type User {
    id_benutzer: Int!
    benutzername: String
    passwort_hash: String
    email: String
    recht_admin: Boolean
  }

  input UserWhere {
    id_benutzer: Int
    benutzername: String
    passwort_hash: String
    email: String
    recht_admin: Boolean
  }

  extend type Query {
    getAllUsers: [User]
    getUser(where: UserWhere!): [User]
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return prisma.benutzer.findMany();
    },
    getUser: async (_, { where: { id_benutzer, benutzername, passwort_hash, email, recht_admin } }) => {
      let x = await prisma.benutzer.findFirst({
        where: {
          OR: [
            { id_benutzer: id_benutzer },
            { benutzername: benutzername },
            { passwort_hash: passwort_hash },
            { email: email },
            { recht_admin: recht_admin != undefined ? (recht_admin ? 1 : 0) : undefined },
          ],
        }
      });
      return [].concat(x);
    }
  }
}


module.exports = {
  typeDef,
  resolvers
}