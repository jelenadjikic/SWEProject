import { gql } from "apollo-boost";

export const SCHEDULES = gql`
  query Schedules($user: ID) {
    schedules(user: $user) {
      _id
      date
      time
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

export const SCHEDULES_BY_DATE = gql`
  query ShedulesByDate($user: ID, $date: String) {
    schedulesByDate(user: $user, date: $date) {
      _id
      date
      time
      user {
        _id
        name
      }
    }
  }
`;
export const REQUESTS_BY_USER = gql`
  query RequestsByUser($id: ID) {
    requestsByUser(id: $id) {
      _id
      date
      time
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
