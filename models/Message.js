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

  input MessageInput {
    room: Int!
    user: Int!
    message: String!
  }

  extend type Mutation {
    writeMessage(input: MessageInput): Message
  }
`;

const resolvers = {
  Query: {
    getAllMessages: async () => {
      return await prisma.nachricht.findMany();
    },
    getMessage: async (_, { id }) => {
      return await prisma.nachricht.findFirst({
        where: { id_nachricht: id }
      })
    }
  },
  Mutation: {
    writeMessage: async (_, { input }) => {
      const { message, room, user } = input;
      return await prisma.nachricht.create({
        data: {
          zeitstempel: new Date().toISOString(),
          text: message,
          id_raum: room,
          id_benutzer: user
        }
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