import { gql } from "apollo-boost";

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($answerInput: AnswerInput) {
    createAnswer(answerInput: $answerInput) {
      _id
      answer
      answerDate
      user {
        _id
        name
      }
      question {
        _id
        name
        question
      }
    }
  }
`;

export const CHANGE_ANSWER = gql`
  mutation UpdateAnswer($id: ID, $answer: String) {
    updateAnswer(id: $id, answer: $answer) {
      _id
      answer
      answerDate
    }
  }
`;
export const DELETE_ANSWER = gql`
  mutation DeleteAnswer($id: ID) {
    deleteAnswer(id: $id) {
      _id
      answer
      answerDate
    }
  }
`;
