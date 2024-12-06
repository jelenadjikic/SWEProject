import { gql } from "apollo-boost";

export const USER_LOGIN = gql`
  mutation Login($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      token
      name
      tokenExpiration
      role
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $id: ID
    $password: String
    $newPassword: String
    $confirmation: String
  ) {
    changePassword(
      id: $id
      password: $password
      newPassword: $newPassword
      confirmation: $confirmation
    ) {
      _id
      name
      username
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID, $name: String, $username: String) {
    updateUser(id: $id, name: $name, username: $username) {
      _id
      name
      username
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      _id
      name
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation Register($userInput: UserInput) {
    register(userInput: $userInput) {
      _id
      name
      username
    }
  }
`;
