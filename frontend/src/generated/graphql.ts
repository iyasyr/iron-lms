// @ts-nocheck
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Long: { input: any; output: any; }
};

export type Assignment = {
  __typename?: 'Assignment';
  allowLate: Scalars['Boolean']['output'];
  courseId?: Maybe<Scalars['ID']['output']>;
  dueAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  lessonId?: Maybe<Scalars['ID']['output']>;
  maxPoints: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type AssignmentCreateInput = {
  allowLate: Scalars['Boolean']['input'];
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  lessonId: Scalars['ID']['input'];
  maxPoints: Scalars['Int']['input'];
  /**  <-- add this */
  title: Scalars['String']['input'];
};

export type AssignmentUpdateInput = {
  allowLate?: InputMaybe<Scalars['Boolean']['input']>;
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  maxPoints?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Course = {
  __typename?: 'Course';
  /**  resolved via @SchemaMapping */
  assignments: Array<Assignment>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instructor: Instructor;
  instructorId: Scalars['ID']['output'];
  lessons: Array<Lesson>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CoursePage = {
  __typename?: 'CoursePage';
  content: Array<Course>;
  pageInfo: PageInfo;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  course: Course;
  courseId: Scalars['ID']['output'];
  enrolledAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  studentId: Scalars['ID']['output'];
};

export type EnrollmentPage = {
  __typename?: 'EnrollmentPage';
  content: Array<Enrollment>;
  pageInfo: PageInfo;
};

export type Instructor = {
  __typename?: 'Instructor';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Item = {
  __typename?: 'Item';
  bodyMarkdown: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lesson: Lesson;
  lessonId: Scalars['ID']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ItemCreateInput = {
  bodyMarkdown: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  lessonId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type ItemPage = {
  __typename?: 'ItemPage';
  content: Array<Item>;
  pageInfo: PageInfo;
};

export type ItemUpdateInput = {
  bodyMarkdown?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  course: Course;
  courseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  item?: Maybe<Item>;
  orderIndex: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type LessonCreateInput = {
  courseId: Scalars['ID']['input'];
  orderIndex: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelEnrollment: Enrollment;
  createAssignment: Assignment;
  createItem: Item;
  createLesson: Lesson;
  deleteAssignment: Scalars['Boolean']['output'];
  deleteItem: Scalars['Boolean']['output'];
  enrollInCourse: Enrollment;
  gradeSubmission: Submission;
  requestResubmission: Submission;
  submit: Submission;
  updateAssignment: Assignment;
  updateItem: Item;
};


export type MutationCancelEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type MutationCreateAssignmentArgs = {
  input: AssignmentCreateInput;
};


export type MutationCreateItemArgs = {
  input: ItemCreateInput;
};


export type MutationCreateLessonArgs = {
  input: LessonCreateInput;
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnrollInCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type MutationGradeSubmissionArgs = {
  feedback?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  score: Scalars['Int']['input'];
};


export type MutationRequestResubmissionArgs = {
  feedback?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationSubmitArgs = {
  artifactUrl: Scalars['String']['input'];
  assignmentId: Scalars['ID']['input'];
};


export type MutationUpdateAssignmentArgs = {
  id: Scalars['ID']['input'];
  input: AssignmentUpdateInput;
};


export type MutationUpdateItemArgs = {
  id: Scalars['ID']['input'];
  input: ItemUpdateInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalElements: Scalars['Long']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PageRequestInput = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type Query = {
  __typename?: 'Query';
  assignment?: Maybe<Assignment>;
  course: Course;
  courses: CoursePage;
  item?: Maybe<Item>;
  items: ItemPage;
  lesson?: Maybe<Lesson>;
  myEnrollments: EnrollmentPage;
  mySubmissions: SubmissionPage;
  submissionsByCourse: SubmissionPage;
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryAssignmentArgs = {
  id: Scalars['ID']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryCoursesArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryLessonArgs = {
  id: Scalars['ID']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryMyEnrollmentsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QueryMySubmissionsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


/**  This file is intentionally minimal - all types are defined in their respective .graphqls files */
export type QuerySubmissionsByCourseArgs = {
  courseId: Scalars['ID']['input'];
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

export type Submission = {
  __typename?: 'Submission';
  artifactUrl: Scalars['String']['output'];
  assignmentId: Scalars['ID']['output'];
  courseId: Scalars['ID']['output'];
  feedback?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  score?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  studentId: Scalars['ID']['output'];
  submittedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type SubmissionPage = {
  __typename?: 'SubmissionPage';
  content: Array<Submission>;
  pageInfo: PageInfo;
};

export type CreateItemMutationVariables = Exact<{
  input: ItemCreateInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename: 'Item', id: string, lessonId: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any } };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type GetMyEnrollmentsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetMyEnrollmentsQuery = { __typename?: 'Query', myEnrollments: { __typename?: 'EnrollmentPage', content: Array<{ __typename?: 'Enrollment', id: string, courseId: string, studentId: string, enrolledAt: any, status: string, course: { __typename?: 'Course', id: string, instructorId: string, title: string, description?: string | null, status: string, createdAt: any, publishedAt?: any | null, lessons: Array<{ __typename?: 'Lesson', id: string, title: string, orderIndex: number }>, assignments: Array<{ __typename?: 'Assignment', id: string, title: string, instructions?: string | null, dueAt?: any | null, maxPoints: number }> } }>, pageInfo: { __typename?: 'PageInfo', page: number, pageSize: number, totalElements: any, totalPages: number, hasNext: boolean } } };

export type EnrollInCourseMutationVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type EnrollInCourseMutation = { __typename?: 'Mutation', enrollInCourse: { __typename?: 'Enrollment', id: string, courseId: string, studentId: string, enrolledAt: any, status: string, course: { __typename?: 'Course', id: string, title: string, description?: string | null, status: string } } };

export type CancelEnrollmentMutationVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;


export type CancelEnrollmentMutation = { __typename?: 'Mutation', cancelEnrollment: { __typename?: 'Enrollment', id: string, courseId: string, studentId: string, enrolledAt: any, status: string } };

export type GetAssignmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssignmentQuery = { __typename?: 'Query', assignment?: { __typename: 'Assignment', id: string, courseId?: string | null, lessonId?: string | null, title: string, instructions?: string | null, maxPoints: number, allowLate: boolean, dueAt?: any | null } | null };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCourseQuery = { __typename?: 'Query', course: { __typename: 'Course', id: string, instructorId: string, title: string, description?: string | null, status: string, createdAt: any, publishedAt?: any | null, lessons: Array<{ __typename: 'Lesson', id: string, title: string, orderIndex: number, item?: { __typename?: 'Item', id: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any } | null }>, assignments: Array<{ __typename: 'Assignment', id: string, title: string, instructions?: string | null, dueAt?: any | null, maxPoints: number, allowLate: boolean }> } };

export type GetCoursesQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetCoursesQuery = { __typename?: 'Query', courses: { __typename: 'CoursePage', content: Array<{ __typename: 'Course', id: string, instructorId: string, title: string, description?: string | null, status: string, createdAt: any, publishedAt?: any | null, lessons: Array<{ __typename: 'Lesson', id: string, title: string, orderIndex: number }>, assignments: Array<{ __typename: 'Assignment', id: string, title: string, instructions?: string | null, dueAt?: any | null, maxPoints: number }> }>, pageInfo: { __typename: 'PageInfo', page: number, pageSize: number, totalElements: any, totalPages: number, hasNext: boolean } } };

export type GetItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetItemQuery = { __typename?: 'Query', item?: { __typename: 'Item', id: string, lessonId: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any } | null };

export type GetItemsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: { __typename: 'ItemPage', content: Array<{ __typename: 'Item', id: string, lessonId: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any }>, pageInfo: { __typename: 'PageInfo', page: number, pageSize: number, totalElements: any, totalPages: number, hasNext: boolean } } };

export type GetLessonQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson?: { __typename: 'Lesson', id: string, courseId: string, title: string, orderIndex: number, item?: { __typename?: 'Item', id: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any } | null } | null };

export type SubmitMutationVariables = Exact<{
  assignmentId: Scalars['ID']['input'];
  artifactUrl: Scalars['String']['input'];
}>;


export type SubmitMutation = { __typename?: 'Mutation', submit: { __typename: 'Submission', id: string, assignmentId: string, courseId: string, studentId: string, submittedAt: any, artifactUrl: string, status: string, score?: number | null, feedback?: string | null, version: number } };

export type MySubmissionsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type MySubmissionsQuery = { __typename?: 'Query', mySubmissions: { __typename: 'SubmissionPage', content: Array<{ __typename: 'Submission', id: string, assignmentId: string, courseId: string, studentId: string, submittedAt: any, artifactUrl: string, status: string, score?: number | null, feedback?: string | null, version: number }>, pageInfo: { __typename?: 'PageInfo', page: number, pageSize: number, totalElements: any, totalPages: number, hasNext: boolean } } };

export type SubmissionsByCourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type SubmissionsByCourseQuery = { __typename?: 'Query', submissionsByCourse: { __typename: 'SubmissionPage', content: Array<{ __typename: 'Submission', id: string, assignmentId: string, courseId: string, studentId: string, submittedAt: any, artifactUrl: string, status: string, score?: number | null, feedback?: string | null, version: number }>, pageInfo: { __typename?: 'PageInfo', page: number, pageSize: number, totalElements: any, totalPages: number, hasNext: boolean } } };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ItemUpdateInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename: 'Item', id: string, lessonId: string, title: string, description?: string | null, tags: Array<string>, bodyMarkdown: string, createdAt: any, updatedAt: any } };

export type CreateLessonMutationVariables = Exact<{
  input: LessonCreateInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename: 'Lesson', id: string, courseId: string, title: string, orderIndex: number } };


export const CreateItemDocument = gql`
    mutation CreateItem($input: ItemCreateInput!) {
  createItem(input: $input) {
    id
    lessonId
    title
    description
    tags
    bodyMarkdown
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type CreateItemMutationFn = ApolloReactCommon.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = ApolloReactCommon.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($id: ID!) {
  deleteItem(id: $id)
}
    `;
export type DeleteItemMutationFn = ApolloReactCommon.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = ApolloReactCommon.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const GetMyEnrollmentsDocument = gql`
    query GetMyEnrollments($page: Int!, $pageSize: Int!) {
  myEnrollments(page: $page, pageSize: $pageSize) {
    content {
      id
      courseId
      studentId
      enrolledAt
      status
      course {
        id
        instructorId
        title
        description
        status
        createdAt
        publishedAt
        lessons {
          id
          title
          orderIndex
        }
        assignments {
          id
          title
          instructions
          dueAt
          maxPoints
        }
      }
    }
    pageInfo {
      page
      pageSize
      totalElements
      totalPages
      hasNext
    }
  }
}
    `;

/**
 * __useGetMyEnrollmentsQuery__
 *
 * To run a query within a React component, call `useGetMyEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEnrollmentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetMyEnrollmentsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables> & ({ variables: GetMyEnrollmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>(GetMyEnrollmentsDocument, options);
      }
export function useGetMyEnrollmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>(GetMyEnrollmentsDocument, options);
        }
export function useGetMyEnrollmentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>(GetMyEnrollmentsDocument, options);
        }
export type GetMyEnrollmentsQueryHookResult = ReturnType<typeof useGetMyEnrollmentsQuery>;
export type GetMyEnrollmentsLazyQueryHookResult = ReturnType<typeof useGetMyEnrollmentsLazyQuery>;
export type GetMyEnrollmentsSuspenseQueryHookResult = ReturnType<typeof useGetMyEnrollmentsSuspenseQuery>;
export type GetMyEnrollmentsQueryResult = ApolloReactCommon.QueryResult<GetMyEnrollmentsQuery, GetMyEnrollmentsQueryVariables>;
export const EnrollInCourseDocument = gql`
    mutation EnrollInCourse($courseId: ID!) {
  enrollInCourse(courseId: $courseId) {
    id
    courseId
    studentId
    enrolledAt
    status
    course {
      id
      title
      description
      status
    }
  }
}
    `;
export type EnrollInCourseMutationFn = ApolloReactCommon.MutationFunction<EnrollInCourseMutation, EnrollInCourseMutationVariables>;

/**
 * __useEnrollInCourseMutation__
 *
 * To run a mutation, you first call `useEnrollInCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollInCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollInCourseMutation, { data, loading, error }] = useEnrollInCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useEnrollInCourseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EnrollInCourseMutation, EnrollInCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EnrollInCourseMutation, EnrollInCourseMutationVariables>(EnrollInCourseDocument, options);
      }
export type EnrollInCourseMutationHookResult = ReturnType<typeof useEnrollInCourseMutation>;
export type EnrollInCourseMutationResult = ApolloReactCommon.MutationResult<EnrollInCourseMutation>;
export type EnrollInCourseMutationOptions = ApolloReactCommon.BaseMutationOptions<EnrollInCourseMutation, EnrollInCourseMutationVariables>;
export const CancelEnrollmentDocument = gql`
    mutation CancelEnrollment($enrollmentId: ID!) {
  cancelEnrollment(enrollmentId: $enrollmentId) {
    id
    courseId
    studentId
    enrolledAt
    status
  }
}
    `;
export type CancelEnrollmentMutationFn = ApolloReactCommon.MutationFunction<CancelEnrollmentMutation, CancelEnrollmentMutationVariables>;

/**
 * __useCancelEnrollmentMutation__
 *
 * To run a mutation, you first call `useCancelEnrollmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelEnrollmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelEnrollmentMutation, { data, loading, error }] = useCancelEnrollmentMutation({
 *   variables: {
 *      enrollmentId: // value for 'enrollmentId'
 *   },
 * });
 */
export function useCancelEnrollmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelEnrollmentMutation, CancelEnrollmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelEnrollmentMutation, CancelEnrollmentMutationVariables>(CancelEnrollmentDocument, options);
      }
export type CancelEnrollmentMutationHookResult = ReturnType<typeof useCancelEnrollmentMutation>;
export type CancelEnrollmentMutationResult = ApolloReactCommon.MutationResult<CancelEnrollmentMutation>;
export type CancelEnrollmentMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelEnrollmentMutation, CancelEnrollmentMutationVariables>;
export const GetAssignmentDocument = gql`
    query GetAssignment($id: ID!) {
  assignment(id: $id) {
    id
    courseId
    lessonId
    title
    instructions
    maxPoints
    allowLate
    dueAt
    __typename
  }
}
    `;

/**
 * __useGetAssignmentQuery__
 *
 * To run a query within a React component, call `useGetAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssignmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAssignmentQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetAssignmentQuery, GetAssignmentQueryVariables> & ({ variables: GetAssignmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(GetAssignmentDocument, options);
      }
export function useGetAssignmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAssignmentQuery, GetAssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(GetAssignmentDocument, options);
        }
export function useGetAssignmentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAssignmentQuery, GetAssignmentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAssignmentQuery, GetAssignmentQueryVariables>(GetAssignmentDocument, options);
        }
export type GetAssignmentQueryHookResult = ReturnType<typeof useGetAssignmentQuery>;
export type GetAssignmentLazyQueryHookResult = ReturnType<typeof useGetAssignmentLazyQuery>;
export type GetAssignmentSuspenseQueryHookResult = ReturnType<typeof useGetAssignmentSuspenseQuery>;
export type GetAssignmentQueryResult = ApolloReactCommon.QueryResult<GetAssignmentQuery, GetAssignmentQueryVariables>;
export const GetCourseDocument = gql`
    query GetCourse($id: ID!) {
  course(id: $id) {
    id
    instructorId
    title
    description
    status
    createdAt
    publishedAt
    lessons {
      id
      title
      orderIndex
      item {
        id
        title
        description
        tags
        bodyMarkdown
        createdAt
        updatedAt
      }
      __typename
    }
    assignments {
      id
      title
      instructions
      dueAt
      maxPoints
      allowLate
      __typename
    }
    __typename
  }
}
    `;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables> & ({ variables: GetCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export function useGetCourseSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseSuspenseQueryHookResult = ReturnType<typeof useGetCourseSuspenseQuery>;
export type GetCourseQueryResult = ApolloReactCommon.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export const GetCoursesDocument = gql`
    query GetCourses($page: Int!, $pageSize: Int!) {
  courses(page: $page, pageSize: $pageSize) {
    content {
      id
      instructorId
      title
      description
      status
      createdAt
      publishedAt
      lessons {
        id
        title
        orderIndex
        __typename
      }
      assignments {
        id
        title
        instructions
        dueAt
        maxPoints
        __typename
      }
      __typename
    }
    pageInfo {
      page
      pageSize
      totalElements
      totalPages
      hasNext
      __typename
    }
    __typename
  }
}
    `;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables> & ({ variables: GetCoursesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export function useGetCoursesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesSuspenseQueryHookResult = ReturnType<typeof useGetCoursesSuspenseQuery>;
export type GetCoursesQueryResult = ApolloReactCommon.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetItemDocument = gql`
    query GetItem($id: ID!) {
  item(id: $id) {
    id
    lessonId
    title
    description
    tags
    bodyMarkdown
    createdAt
    updatedAt
    __typename
  }
}
    `;

/**
 * __useGetItemQuery__
 *
 * To run a query within a React component, call `useGetItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetItemQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetItemQuery, GetItemQueryVariables> & ({ variables: GetItemQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
      }
export function useGetItemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
        }
export function useGetItemSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
        }
export type GetItemQueryHookResult = ReturnType<typeof useGetItemQuery>;
export type GetItemLazyQueryHookResult = ReturnType<typeof useGetItemLazyQuery>;
export type GetItemSuspenseQueryHookResult = ReturnType<typeof useGetItemSuspenseQuery>;
export type GetItemQueryResult = ApolloReactCommon.QueryResult<GetItemQuery, GetItemQueryVariables>;
export const GetItemsDocument = gql`
    query GetItems($search: String, $page: Int!, $pageSize: Int!) {
  items(search: $search, page: $page, pageSize: $pageSize) {
    content {
      id
      lessonId
      title
      description
      tags
      bodyMarkdown
      createdAt
      updatedAt
      __typename
    }
    pageInfo {
      page
      pageSize
      totalElements
      totalPages
      hasNext
      __typename
    }
    __typename
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetItemsQuery, GetItemsQueryVariables> & ({ variables: GetItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export function useGetItemsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsSuspenseQueryHookResult = ReturnType<typeof useGetItemsSuspenseQuery>;
export type GetItemsQueryResult = ApolloReactCommon.QueryResult<GetItemsQuery, GetItemsQueryVariables>;
export const GetLessonDocument = gql`
    query GetLesson($id: ID!) {
  lesson(id: $id) {
    id
    courseId
    title
    orderIndex
    item {
      id
      title
      description
      tags
      bodyMarkdown
      createdAt
      updatedAt
    }
    __typename
  }
}
    `;

/**
 * __useGetLessonQuery__
 *
 * To run a query within a React component, call `useGetLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLessonQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLessonQuery, GetLessonQueryVariables> & ({ variables: GetLessonQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
      }
export function useGetLessonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
        }
export function useGetLessonSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
        }
export type GetLessonQueryHookResult = ReturnType<typeof useGetLessonQuery>;
export type GetLessonLazyQueryHookResult = ReturnType<typeof useGetLessonLazyQuery>;
export type GetLessonSuspenseQueryHookResult = ReturnType<typeof useGetLessonSuspenseQuery>;
export type GetLessonQueryResult = ApolloReactCommon.QueryResult<GetLessonQuery, GetLessonQueryVariables>;
export const SubmitDocument = gql`
    mutation Submit($assignmentId: ID!, $artifactUrl: String!) {
  submit(assignmentId: $assignmentId, artifactUrl: $artifactUrl) {
    id
    assignmentId
    courseId
    studentId
    submittedAt
    artifactUrl
    status
    score
    feedback
    version
    __typename
  }
}
    `;
export type SubmitMutationFn = ApolloReactCommon.MutationFunction<SubmitMutation, SubmitMutationVariables>;

/**
 * __useSubmitMutation__
 *
 * To run a mutation, you first call `useSubmitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitMutation, { data, loading, error }] = useSubmitMutation({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *      artifactUrl: // value for 'artifactUrl'
 *   },
 * });
 */
export function useSubmitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitMutation, SubmitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SubmitMutation, SubmitMutationVariables>(SubmitDocument, options);
      }
export type SubmitMutationHookResult = ReturnType<typeof useSubmitMutation>;
export type SubmitMutationResult = ApolloReactCommon.MutationResult<SubmitMutation>;
export type SubmitMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitMutation, SubmitMutationVariables>;
export const MySubmissionsDocument = gql`
    query MySubmissions($page: Int!, $pageSize: Int!) {
  mySubmissions(page: $page, pageSize: $pageSize) {
    content {
      id
      assignmentId
      courseId
      studentId
      submittedAt
      artifactUrl
      status
      score
      feedback
      version
      __typename
    }
    pageInfo {
      page
      pageSize
      totalElements
      totalPages
      hasNext
    }
    __typename
  }
}
    `;

/**
 * __useMySubmissionsQuery__
 *
 * To run a query within a React component, call `useMySubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySubmissionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useMySubmissionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MySubmissionsQuery, MySubmissionsQueryVariables> & ({ variables: MySubmissionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MySubmissionsQuery, MySubmissionsQueryVariables>(MySubmissionsDocument, options);
      }
export function useMySubmissionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySubmissionsQuery, MySubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MySubmissionsQuery, MySubmissionsQueryVariables>(MySubmissionsDocument, options);
        }
export function useMySubmissionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MySubmissionsQuery, MySubmissionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MySubmissionsQuery, MySubmissionsQueryVariables>(MySubmissionsDocument, options);
        }
export type MySubmissionsQueryHookResult = ReturnType<typeof useMySubmissionsQuery>;
export type MySubmissionsLazyQueryHookResult = ReturnType<typeof useMySubmissionsLazyQuery>;
export type MySubmissionsSuspenseQueryHookResult = ReturnType<typeof useMySubmissionsSuspenseQuery>;
export type MySubmissionsQueryResult = ApolloReactCommon.QueryResult<MySubmissionsQuery, MySubmissionsQueryVariables>;
export const SubmissionsByCourseDocument = gql`
    query SubmissionsByCourse($courseId: ID!, $page: Int!, $pageSize: Int!) {
  submissionsByCourse(courseId: $courseId, page: $page, pageSize: $pageSize) {
    content {
      id
      assignmentId
      courseId
      studentId
      submittedAt
      artifactUrl
      status
      score
      feedback
      version
      __typename
    }
    pageInfo {
      page
      pageSize
      totalElements
      totalPages
      hasNext
    }
    __typename
  }
}
    `;

/**
 * __useSubmissionsByCourseQuery__
 *
 * To run a query within a React component, call `useSubmissionsByCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmissionsByCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmissionsByCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useSubmissionsByCourseQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables> & ({ variables: SubmissionsByCourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>(SubmissionsByCourseDocument, options);
      }
export function useSubmissionsByCourseLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>(SubmissionsByCourseDocument, options);
        }
export function useSubmissionsByCourseSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>(SubmissionsByCourseDocument, options);
        }
export type SubmissionsByCourseQueryHookResult = ReturnType<typeof useSubmissionsByCourseQuery>;
export type SubmissionsByCourseLazyQueryHookResult = ReturnType<typeof useSubmissionsByCourseLazyQuery>;
export type SubmissionsByCourseSuspenseQueryHookResult = ReturnType<typeof useSubmissionsByCourseSuspenseQuery>;
export type SubmissionsByCourseQueryResult = ApolloReactCommon.QueryResult<SubmissionsByCourseQuery, SubmissionsByCourseQueryVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($id: ID!, $input: ItemUpdateInput!) {
  updateItem(id: $id, input: $input) {
    id
    lessonId
    title
    description
    tags
    bodyMarkdown
    createdAt
    updatedAt
    __typename
  }
}
    `;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($input: LessonCreateInput!) {
  createLesson(input: $input) {
    id
    courseId
    title
    orderIndex
    __typename
  }
}
    `;
export type CreateLessonMutationFn = ApolloReactCommon.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = ApolloReactCommon.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;