const feed = async (_, args, context, info) => {
  const where = args.filter
    ? {
        OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
      }
    : {};

  const links = context.prisma.link.findMany();
  console.log(links);
  // const links = await context.prisma.links({
  //   where,
  //   skip: args.skip,
  //   first: args.first,
  //   orderBy: args.orderBy,
  // });

  const count = 2;
  // const count = await context.prisma
  //   .linksConnection({
  //     where,
  //   })
  //   .aggregate()
  //   .count();
  return { links, count };
};

module.exports = {
  feed,
};
