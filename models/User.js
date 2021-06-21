const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');


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

  input UserInput {
    benutzername: String
    passwort: String
    email: String
    recht_admin: Boolean
  }

  extend type Query {
    getAllUsers: [User]
    getUser(where: UserWhere!): [User]  
  }

  extend type Mutation {
    addUser(input: UserInput!): User
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return prisma.benutzer.findMany();
    },
    getUser: async (_, { where: { id_benutzer, benutzername, passwort_hash, email, recht_admin } }) => {
      let users = await prisma.benutzer.findMany({
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
      return users;
    }
  },
  Mutation: {
    addUser: async (_, { input: { benutzername, passwort, email, recht_admin } }) => {
      return await prisma.benutzer.create({
        data: {
          benutzername: benutzername,
          passwort_hash: await bcrypt.hash(passwort, bcrypt.genSaltSync(12)),
          email: email,
          recht_admin: recht_admin ? 1 : 0
        }
      })
    }
  },
}


module.exports = {
  typeDef,
  resolvers
}