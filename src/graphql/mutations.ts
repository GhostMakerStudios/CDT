/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createThought = /* GraphQL */ `mutation CreateThought(
  $input: CreateThoughtInput!
  $condition: ModelThoughtConditionInput
) {
  createThought(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateThoughtMutationVariables,
  APITypes.CreateThoughtMutation
>;
export const updateThought = /* GraphQL */ `mutation UpdateThought(
  $input: UpdateThoughtInput!
  $condition: ModelThoughtConditionInput
) {
  updateThought(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateThoughtMutationVariables,
  APITypes.UpdateThoughtMutation
>;
export const deleteThought = /* GraphQL */ `mutation DeleteThought(
  $input: DeleteThoughtInput!
  $condition: ModelThoughtConditionInput
) {
  deleteThought(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteThoughtMutationVariables,
  APITypes.DeleteThoughtMutation
>;
