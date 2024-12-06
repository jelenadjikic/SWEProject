import { gql } from "apollo-boost";

export const ADD_INTERVENTION = gql`
  mutation CreateIntervention(
    $date: String
    $description: String
    $patient: ID
  ) {
    createIntervention(
      date: $date
      description: $description
      patient: $patient
    ) {
      date
      description
      patient {
        _id
        name
      }
    }
  }
`;
export const CHANGE_INTERVENTION = gql`
  mutation UpdateIntervention(
    $updateInterventionInput: UpdateInterventionInput
  ) {
    updateIntervention(updateInterventionInput: $updateInterventionInput) {
      _id
      date
      description
    }
  }
`;
export const DELETE_INTERVENTION = gql`
  mutation DeleteIntervention($id: ID) {
    deleteIntervention(id: $id) {
      _id
      date
      description
    }
  }
`;
