/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateThoughtInput = {
  id?: string | null,
  date: string,
  title: string,
  message: string,
  tags: Array< string >,
  embedding: Array< number >,
  audioUrl?: string | null,
};

export type ModelThoughtConditionInput = {
  date?: ModelStringInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  embedding?: ModelFloatInput | null,
  audioUrl?: ModelStringInput | null,
  and?: Array< ModelThoughtConditionInput | null > | null,
  or?: Array< ModelThoughtConditionInput | null > | null,
  not?: ModelThoughtConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Thought = {
  __typename: "Thought",
  id: string,
  date: string,
  title: string,
  message: string,
  tags: Array< string >,
  embedding: Array< number >,
  audioUrl?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateThoughtInput = {
  id: string,
  date?: string | null,
  title?: string | null,
  message?: string | null,
  tags?: Array< string > | null,
  embedding?: Array< number > | null,
  audioUrl?: string | null,
};

export type DeleteThoughtInput = {
  id: string,
};

export type ModelThoughtFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  embedding?: ModelFloatInput | null,
  audioUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelThoughtFilterInput | null > | null,
  or?: Array< ModelThoughtFilterInput | null > | null,
  not?: ModelThoughtFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelThoughtConnection = {
  __typename: "ModelThoughtConnection",
  items:  Array<Thought | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionThoughtFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  tags?: ModelSubscriptionStringInput | null,
  embedding?: ModelSubscriptionFloatInput | null,
  audioUrl?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionThoughtFilterInput | null > | null,
  or?: Array< ModelSubscriptionThoughtFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateThoughtMutationVariables = {
  input: CreateThoughtInput,
  condition?: ModelThoughtConditionInput | null,
};

export type CreateThoughtMutation = {
  createThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateThoughtMutationVariables = {
  input: UpdateThoughtInput,
  condition?: ModelThoughtConditionInput | null,
};

export type UpdateThoughtMutation = {
  updateThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteThoughtMutationVariables = {
  input: DeleteThoughtInput,
  condition?: ModelThoughtConditionInput | null,
};

export type DeleteThoughtMutation = {
  deleteThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetThoughtQueryVariables = {
  id: string,
};

export type GetThoughtQuery = {
  getThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListThoughtsQueryVariables = {
  filter?: ModelThoughtFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListThoughtsQuery = {
  listThoughts?:  {
    __typename: "ModelThoughtConnection",
    items:  Array< {
      __typename: "Thought",
      id: string,
      date: string,
      title: string,
      message: string,
      tags: Array< string >,
      embedding: Array< number >,
      audioUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateThoughtSubscriptionVariables = {
  filter?: ModelSubscriptionThoughtFilterInput | null,
};

export type OnCreateThoughtSubscription = {
  onCreateThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateThoughtSubscriptionVariables = {
  filter?: ModelSubscriptionThoughtFilterInput | null,
};

export type OnUpdateThoughtSubscription = {
  onUpdateThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteThoughtSubscriptionVariables = {
  filter?: ModelSubscriptionThoughtFilterInput | null,
};

export type OnDeleteThoughtSubscription = {
  onDeleteThought?:  {
    __typename: "Thought",
    id: string,
    date: string,
    title: string,
    message: string,
    tags: Array< string >,
    embedding: Array< number >,
    audioUrl?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
