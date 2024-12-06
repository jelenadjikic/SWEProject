import { gql } from "apollo-boost";

export const MESSAGES = gql`
  query Messages($user: ID, $patient: ID) {
    messages(user: $user, patient: $patient) {
      message
      date
      sender
      user {
        name
      }
      patient {
        name
      }
    }
  }
`;
export const FIND_UNREAD_MESSAGES_BY_USER = gql`
  query FindUnreadMessagesByUser($id: ID) {
    findUnreadMessagesByUser(id: $id)
  }
`;

export const FIND_UNREAD_MESSAGES_BY_USER_AND_PATIENT = gql`
  query FindUnreadMessagesByUserAndPatient($user: ID, $patient: ID) {
    findUnreadMessagesByUserAndPatient(user: $user, patient: $patient)
  }
`;
