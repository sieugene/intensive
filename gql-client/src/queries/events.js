import { gql } from "@apollo/client";

export const allEvenetsQuery = gql`
  query AllEvents($filter: String) {
    allEvents(filter: $filter) {
      title
      id
      url
    }
  }
`;
