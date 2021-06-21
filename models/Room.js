const { gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const typeDef = gql`
  type Room {
    id_raum: Int!
    name: String
  }

  extend type Query {
    getAllRooms: [Room]
    getRoom(where: RoomWhere!): [Room]
  }

  input RoomWhere {
    id_raum: Int
    name: String
  }

  input RoomInput {
    name: String
  }

  extend type Mutation {
    createRoom(input: RoomInput!): Room
  }
`;

const resolvers = {
  Query: {
    getAllRooms: async () => {
      return prisma.raum.findMany();
    },
    getRoom: async (_, { where: { id_raum, name } }) => {
      let rooms = await prisma.raum.findMany({
        where: {
          OR: [
            { id_raum: id_raum },
            { name: name }
          ],
        }
      });
      return rooms;
    }
  },
  Mutation: {
    createRoom: async (_, { input: { name } }) => {
      return await prisma.raum.create({
        data: {
          name: name,
        }
      })
    }
  },
}


module.exports = {
  typeDef,
  resolvers
}