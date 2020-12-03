const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const bcrypt = require("bcrypt");

const post = (parent, args, context) => {
  // console.log(context);
  const userId = getUserId(context);
  const postResult = context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  return postResult;
};

const signup = async (_, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  // context.prisma.테이블.해당매서드. 매서드들은 어떻게 보지...?
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
  const token = await jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (_, args, context, info) => {
  console.log(args);
  const user = await context.prisma.user.findOne({
    where: {
      // email: { contains: args.email} ,
      email: args.email,
    },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const vote = async (_, args, context, info) => {
  const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });

  if (linkExists) throw new Error(`Already voted for link: ${args.linkId}`);

  const createVote = context.prisma.createVote({
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
