// const newLinkSubscribe = (_, __, context) => {
//   return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
// }
function newLinkSubscribe(_, __, { prisma }) {
  return prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload, __) => {
    return payload;
  },
};

function newVoteSubscribe(_, __, { prisma }) {
  return prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}
const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload, __) => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
