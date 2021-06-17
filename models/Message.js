const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const typeDef = gql`
  type Message {
    id_nachricht: Int!
    id_benutzer: Int!
    id_raum: Int!
    zeitstempel: String
    text: String
    room: Room
    user: User
  }

  extend type Query {
    getAllMessages: [Message]
    getMessage(id: Int!): Message
  }
`;

const resolvers = {
  Query: {
    getAllMessages: async () => {
      return await prisma.nachricht.findMany();
    },
    getMessage: async (_, args) => {
      return await prisma.nachricht.findFirst({
        where: { id_nachricht: args.id }
      })
    }
  },
  Message: {
    room: async (parent) => {
      return await prisma.raum.findFirst({
        where: { id_raum: parent.id_raum }
      })
    },
    user: async (parent) => {
      return await prisma.benutzer.findFirst({
        where: { id_benutzer: parent.id_benutzer }
      })
    },
  }
}


module.exports = {
  typeDef,
  resolvers
}