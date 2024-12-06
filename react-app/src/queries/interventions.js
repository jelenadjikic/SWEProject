import { gql } from "apollo-boost";

export const INTERVENTONS_BY_PATIENT = gql`
  query Interventions($id: ID) {
    interventions(id: $id) {
      _id
      date
      description
    }
  }
`;
