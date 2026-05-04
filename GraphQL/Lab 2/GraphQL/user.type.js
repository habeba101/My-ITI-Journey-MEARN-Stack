const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql/type");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const AuthPayload = new GraphQLObjectType({
  name: "AuthPayload",
  fields: () => ({
    token: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: UserType },
  }),
});

module.exports = { UserType, AuthPayload };
