import { gql } from "apollo-boost";

export const SET_CARTON = gql`
  mutation SetCarton($id: ID, $number: Int, $value: String) {
    setCarton(id: $id, number: $number, value: $value) {
      _id
      teeth
    }
  }
`;
