import gql from "graphql-tag";

export default gql`
  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    username: String!
    age: Int!
    role: String!
    message: [Message]
  }

  input CreateUserInput {
    name: String!
    email: String!
    username: String!
    age: Int!
    password: String!
  }

  input UpdateUserInput {
    name: String
    username: String
    age: Int
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): Boolean!
    login(email: String!, password: String!): Token!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    me: User
  }
`;
