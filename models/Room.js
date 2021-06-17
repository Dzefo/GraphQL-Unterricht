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
    getRoom(id: Int!): Room
  }
`;

const resolvers = {
  Query: {
    getAllRooms: async () => {
      return prisma.raum.findMany();
    },
    getRoom: async (_, args) => {
      return prisma.raum.findFirst({
        where: { id_raum: args.id }
      });
    }
  }
}


module.exports = {
  typeDef,
  resolvers
}