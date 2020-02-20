import { gql } from 'apollo-server';

export default gql`
  type Contact {
    id: String!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    tag: [String!]!
    created: String!
    lastContact: String!
    age: Int!
  }

  type Query {
    search(filter: [SearchType__Input!]!): [Contact!]!
  }

  interface SearchType {
    field: String!
  }

  type SearchType_Number implements SearchType {
    field: String!
    lt: Int
    gt: Int
    eq: Int
  }

  input SearchType_Number__Input {
    field: String!
    lt: Int
    gt: Int
    eq: Int
  }

  type SearchType_String implements SearchType {
    field: String!
    eq: String
    beginsWith: String
    endsWith: String
    contains: String
  }

  input SearchType_String__Input {
    field: String!
    eq: String
    beginsWith: String
    endsWith: String
    contains: String
  }

  type SearchType_Date implements SearchType {
    field: String!
    lt: String
    gt: String
    eq: String
  }

  input SearchType_Date__Input {
    field: String!
    lt: String
    gt: String
    eq: String
  }

  input SearchType__Input {
    Number: SearchType_Number__Input
    String: SearchType_String__Input
    Date: SearchType_Date__Input
  }
`;
