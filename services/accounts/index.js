const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  enum UserType {
    STANDARD
    ADMIN
  }

  type StandardUser @key(fields: "id") {
    id: ID!
    filmId: ID!
    type: UserType!
  }

  type AdminUser @key(fields: "id") {
    id: ID!
    filmId: ID!
    type: UserType!
  }

  union User = StandardUser | AdminUser

  type Account {
    id: ID!
    user: User!
  }

  extend type Query {
    accounts: [Account!]!
  }
`;

const resolvers = {
  Query: {
    accounts() {
      return accounts;
    },
  },
  User: {
    __resolveType(user) {
      switch (user.type) {
        case "STANDARD":
          return "StandardUser";
        case "ADMIN":
          return "AdminUser";
      }
    },
  },
  Account: {
    user(account) {
      return users.find((user) => user.accountId === account.id);
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

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const users = [
  {
    id: "1",
    accountId: "1",
    filmId: "1",
    type: "ADMIN",
  },
  {
    id: "2",
    accountId: "2",
    filmId: "1",
    type: "STANDARD",
  },
];

const accounts = [
  {
    id: "1",
  },
  {
    id: "2",
  },
];
