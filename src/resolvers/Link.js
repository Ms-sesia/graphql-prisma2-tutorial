const postedBy = (parent, __, { prisma }) => {
  return prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .postedBy();
};

const votes = (parent, __, { prisma }) => {
  return prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .votes();
};

module.exports = {
  postedBy,
  votes,
};
