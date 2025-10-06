import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error: any) => {
      const { message, locations, path, extensions } = error
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      
      if (extensions?.originalError?.statusCode === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        return
      }
      if (message.includes('You can only modify items in your own courses')) {
        toast.error('Access denied. You can only modify items in your own courses.')
      } else if (message.includes('Not found')) {
        toast.error('Resource not found.')
      } else if (extensions?.originalError?.statusCode === 403 || message.includes('Access denied')) {
        toast.error('Access denied. You do not have permission to perform this action.')
      } else if (message && message !== 'INTERNAL_ERROR') {
        toast.error(message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    toast.error('Network error. Please check your connection.')
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          courses: {
            keyArgs: ['page', 'pageSize'],
            merge(existing = { content: [], pageInfo: {} }, incoming) {
              return {
                ...incoming,
                content: [...(existing.content || []), ...(incoming.content || [])]
              }
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})
