import { gql } from "apollo-boost";

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($scheduleInput: ScheduleInput) {
    createSchedule(scheduleInput: $scheduleInput) {
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

export const REQUEST_SCHEDULE = gql`
  mutation RequestSchedule($scheduleInput: ScheduleInput) {
    requestSchedule(scheduleInput: $scheduleInput) {
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

export const DELETE_REQUEST_SCHEDULE = gql`
  mutation DeleteRequestSchedule($id: ID) {
    deleteRequestSchedule(id: $id) {
      _id
      user {
        _id
        name
      }
      patient {
        _id
        name
      }
      date
      time
    }
  }
`;
