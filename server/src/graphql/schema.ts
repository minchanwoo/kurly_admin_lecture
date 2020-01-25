import { gql } from "apollo-server-core";

export const schema = gql`
  type ProductReview {
    id: ID!
    title: String!
    text: String!
  }

  type User {
    id: ID!
    nick: String!
    name: String!
    email: String!
    productReviews: [ProductReview!]!
    productReviewsCount: Int!
    createdAt: Float!
  }

  type UsersInfo {
    list: [User!]!
    count: Int!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    image_url: String!
  }

  type ProductsInfo {
    list: [Product!]!
    count: Int!
  }

  type Query {
    users(offset: Int, limit: Int, date_from: Int, date_to: Int): UsersInfo!
    user(id: ID!): User!
    products(offset: Int!, limit: Int!): ProductsInfo!
    product(id: ID!): Product!
  }

  type Mutation {
    login(nick: String!, password: String!): String!
  }
`;
