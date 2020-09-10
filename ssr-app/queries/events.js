import { gql } from "@apollo/client";

export const allEvenetsQuery = gql`
  query AllEvents($filter: String) {
    allEvents(filter: $filter) {
      title
      id
    }
  }
`;

export const eventQuery = gql`
  query Event($id: String!) {
    event(id: $id) {
      url
      title
      id
    }
  }
`;

export const RenameEventMutation = gql`
  mutation renameEventMutation($id: ID!, $title: String!){
    renameEvent(id: $id,title: $title){
      id
      title
    }
  }
`
