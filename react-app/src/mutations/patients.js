import { gql } from "apollo-boost";

export const ADD_PATIENT = gql`
  mutation RegisterPatient($patientInput: PatientInput) {
    registerPatient(patientInput: $patientInput) {
      _id
      name
      city
      address
      phone
      email
    }
  }
`;

export const CHANGE_PATIENT = gql`
  mutation UpdatePatient($updatePatientInput: UpdatePatientInput) {
    updatePatient(updatePatientInput: $updatePatientInput) {
      _id
      name
      email
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID) {
    deletePatient(id: $id) {
      _id
      name
      email
    }
  }
`;
export const LOGIN_PATIENT = gql`
  mutation LoginPatient($loginPatientInput: LoginPatientInput) {
    loginPatient(loginPatientInput: $loginPatientInput) {
      id
      token
      name
      tokenExpiration
      role
    }
  }
`;

export const CHANGE_PATIENT_PASSWORD = gql`
  mutation ChangePatientPassword(
    $id: ID
    $password: String
    $newPassword: String
    $confirmation: String
  ) {
    changePatientPassword(
      id: $id
      password: $password
      newPassword: $newPassword
      confirmation: $confirmation
    ) {
      _id
      name
      email
      password
    }
  }
`;
export const PATIENTS = gql`
  {
    patients {
      _id
      name
      email
    }
  }
`;
