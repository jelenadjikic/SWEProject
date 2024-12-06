import { gql } from "apollo-boost";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($messageInput: MessageInput) {
    createMessage(messageInput: $messageInput) {
      _id
      user {
        _id
        name
      }
      patient {
        _id
        name
      }
    }
  }
`;
export const UPDATE_MESSAGE = gql`
  mutation UpdateMessages($user: ID, $patient: ID) {
    updateMessages(user: $user, patient: $patient) {
      _id
      message
    }
  }
`;
