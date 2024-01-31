import gql from "graphql-tag";

export default gql`
  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    email: String!
    role: String!
    message: [Message]
  }

  input CreateUserInput {
    name: String!
    email: String!
    username: String!
    age: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    username: String
    age: Int
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    login(email: String!, password: String!): Token!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    me: User
  }
`;
