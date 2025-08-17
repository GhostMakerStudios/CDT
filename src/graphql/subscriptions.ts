/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateThought = /* GraphQL */ `subscription OnCreateThought($filter: ModelSubscriptionThoughtFilterInput) {
  onCreateThought(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateThoughtSubscriptionVariables,
  APITypes.OnCreateThoughtSubscription
>;
export const onUpdateThought = /* GraphQL */ `subscription OnUpdateThought($filter: ModelSubscriptionThoughtFilterInput) {
  onUpdateThought(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateThoughtSubscriptionVariables,
  APITypes.OnUpdateThoughtSubscription
>;
export const onDeleteThought = /* GraphQL */ `subscription OnDeleteThought($filter: ModelSubscriptionThoughtFilterInput) {
  onDeleteThought(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteThoughtSubscriptionVariables,
  APITypes.OnDeleteThoughtSubscription
>;
