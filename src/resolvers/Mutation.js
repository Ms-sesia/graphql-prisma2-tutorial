const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const bcrypt = require("bcrypt");

const post = (_, args, { request, prisma }) => {
  const userId = getUserId(request);
  const postResult = prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  return postResult;
};

const signup = async (_, args, { prisma }, info) => {
  const getUser = await prisma.user.findUnique({
    where: { email: args.email },
  });
  if (getUser) throw new Error("This email is already used.");

  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = await jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (_, args, { prisma }, info) => {
  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) throw new Error("No such user found");

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const vote = async (_, args, { request, prisma }, info) => {
  const userId = getUserId(request);

  const linkExists = await prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });

  if (linkExists) throw new Error(`Already voted for link: ${args.linkId}`);

  const createVote = prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });

  return createVote;
};

module.exports = {
  signup,
  login,
  post,
  vote,
};
