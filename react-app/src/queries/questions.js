import { gql } from "apollo-boost";

export const QUESTIONS = gql`
  {
    questions {
      _id
      name
      question
      questionDate
      answers {
        _id
        answer
        answerDate
        user {
          _id
          name
        }
      }
    }
  }
`;
