import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      _id
      username
      password
      name
    }
  }
`;

export const ORDINARY_USERS = gql`
  {
    ordinaryUsers {
      _id
      name
      username
      password
    }
  }
`;
