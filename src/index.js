const { GraphQLServer } = require("graphql-yoga");
// const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: { Query, Mutation, Subscription, User, Link, Vote },
  context: (request) => {
    return { ...request, prisma };
    // return { ...request, prisma };
  },
});

server.start(() => console.log("http://localhost:4000에서 서버 가동중"));
