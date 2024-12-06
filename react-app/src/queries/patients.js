import { gql } from "apollo-boost";

export const PATIENTS = gql`
  {
    patients {
      _id
      name
      address
      email
    }
  }
`;

export const FIND_PATIENTS = gql`
  query FindPatients($name: String) {
    findPatients(name: $name) {
      _id
      name
      city
      address
      phone
      email
      carton {
        _id
        teeth
      }
    }
  }
`;

export const FIND_PATIENT_BY_ID = gql`
  query FindPatient($id: ID) {
    findPatient(id: $id) {
      _id
      name
      city
      address
      phone
      email
      carton {
        _id
        teeth
      }
    }
  }
`;
