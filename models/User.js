// Die nötigen imports werden getätigt
const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

// Der prisma client wird erstellt. Er wird benötigt um mit der Datenbank zu kommunizieren
const prisma = new PrismaClient();

// Die typeDefs definieren das Schema der GraphQL API. Hier werden alle Objekte, Inputs, Querys und Mutations definiert.
const typeDef = gql`
  type User {
    """
    Die ID des Benutzer
    """
    id_benutzer: Int!
    """
    Der Benutzername des Benutzers
    """
    benutzername: String
    """
    Der BCrypt PasswortHash des Benutzers
    """
    passwort_hash: String
    """
    Die E-Mail des Benutzers
    """
    email: String
    """
    Boolean zum feststellen, ob der Benutzer Admin Rechte hat
    """
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

// Die Resolver sind die Methoden, die die Querys und Mutations auflösen.
// Wenn z.B. getUser aufgerufen wird, wird die getUser Methode ausgeführt und der return Wert an den Client zurückgeschickt
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