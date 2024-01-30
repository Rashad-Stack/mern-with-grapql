import gql from "graphql-tag";

export default gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favoriteMovies: [Movie]
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String!
  }

  input UpdateUserInput {
    name: String
    username: String
    age: Int
    nationality: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;
