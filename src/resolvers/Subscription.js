// const newLinkSubscribe = (_, __, context) => {
//   return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
// }
function newLinkSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.link({ mutation_in: ["CREATED"] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload, args, context) => {
    return payload;
  },
};

function newVoteSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.vote({ mutation_in: ["CREATED"] }).node();
}
const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload, args, context) => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
