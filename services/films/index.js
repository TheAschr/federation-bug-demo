const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  type Film @key(fields: "id") {
    id: ID!
    reviewId: ID
  }

  extend type StandardUser @key(fields: "id") {
    id: ID! @external
    filmId: ID! @external
    film: Film! @requires(fields: "filmId")
  }

  extend type AdminUser @key(fields: "id") {
    id: ID! @external
    filmId: ID! @external
    film: Film! @requires(fields: "filmId")
  }
`;

const resolvers = {
  StandardUser: {
    film(account) {
      return films.find((film) => film.id === account.filmId);
    },
  },
  AdminUser: {
    film(account) {
      return films.find((film) => film.id === account.filmId);
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

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const films = [
  {
    id: "1",
    reviewId: "1",
  },
  {
    id: "2",
  },
];
