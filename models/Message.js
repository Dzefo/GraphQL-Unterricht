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

  input MessageWhere {
    id_nachricht: Int
    id_benutzer: Int
    id_raum: Int
    zeitstempel: String
    text: String
  }

  extend type Query {
    getAllMessages: [Message]
    getMessage(where: MessageWhere!): [Message]
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
    getMessage: async (_, { where: { id_nachricht, id_benutzer, id_raum, zeitstempel, text } }) => {
      let messages = await prisma.nachricht.findMany({
        where: {
          OR: [
            { id_nachricht: id_nachricht },
            { id_benutzer: id_benutzer },
            { id_raum: id_raum },
            { zeitstempel: zeitstempel },
            { text: text },
          ],
        }
      });
      return messages;
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