const feed = async (_, args, { prisma }) => {
  const where = args.filter
    ? {
        OR: [{ description: { contains: args.filter } }, { url: { contains: args.filter } }],
      }
    : {};

  const links = await prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = await prisma.link.count({ where });
  return { links, count };
};

module.exports = {
  feed,
};
