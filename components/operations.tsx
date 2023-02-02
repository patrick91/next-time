import { gql } from "@apollo/client";

export const query = gql`
  query {
    currentTime(id: "1") {
      id
      now
      note
    }
  }
`;

export const mutation = gql`
  mutation UpdateTime($note: String!) {
    updateCurrentTime(id: "1", note: $note) {
      id
      now
      note
    }
  }
`;
