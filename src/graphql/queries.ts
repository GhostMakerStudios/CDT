/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getThought = /* GraphQL */ `query GetThought($id: ID!) {
  getThought(id: $id) {
    id
    date
    title
    message
    tags
    embedding
    audioUrl
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetThoughtQueryVariables,
  APITypes.GetThoughtQuery
>;
export const listThoughts = /* GraphQL */ `query ListThoughts(
  $filter: ModelThoughtFilterInput
  $limit: Int
  $nextToken: String
) {
  listThoughts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      title
      message
      tags
      embedding
      audioUrl
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListThoughtsQueryVariables,
  APITypes.ListThoughtsQuery
>;
