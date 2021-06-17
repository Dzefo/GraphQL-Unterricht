const { typeDef: MessageTypeDefs, resolvers: MessageResolvers } = require("./Message");
const { typeDef: RoomTypeDefs, resolvers: RoomResolvers } = require("./Room");
const { typeDef: UserTypeDefs, resolvers: UserResolvers } = require("./User");

module.exports = {
  MessageTypeDefs,
  MessageResolvers,
  RoomTypeDefs,
  RoomResolvers,
  UserTypeDefs,
  UserResolvers
}