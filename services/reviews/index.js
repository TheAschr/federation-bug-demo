const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
  }

  extend type Film @key(fields: "id") {
    id: ID! @external
    reviewId: ID @external
    review: Review @requires(fields: "reviewId")
  }
`;

const resolvers = {
  Film: {
    review(film) {
      return reviews.find((review) => review.id === film.reviewId);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const reviews = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];
