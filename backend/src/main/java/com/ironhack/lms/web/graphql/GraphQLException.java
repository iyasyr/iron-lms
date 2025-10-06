package com.ironhack.lms.web.graphql;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class GraphQLException extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        if (ex instanceof AlreadyEnrolledException) {
            return GraphqlErrorBuilder.newError()
                    .errorType(ErrorType.BAD_REQUEST)
                    .message(ex.getMessage())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .build();
        }
        
        if (ex instanceof ResponseStatusException rse) {
            ErrorType errorType = mapHttpStatusCodeToErrorType(rse.getStatusCode());
            return GraphqlErrorBuilder.newError()
                    .errorType(errorType)
                    .message(rse.getReason())
                    .path(env.getExecutionStepInfo().getPath())
                    .location(env.getField().getSourceLocation())
                    .build();
        }
        
        return null;
    }
    
    private ErrorType mapHttpStatusCodeToErrorType(HttpStatusCode statusCode) {
        if (statusCode instanceof HttpStatus status) {
            return switch (status) {
                case BAD_REQUEST -> ErrorType.BAD_REQUEST;
                case UNAUTHORIZED -> ErrorType.UNAUTHORIZED;
                case FORBIDDEN -> ErrorType.FORBIDDEN;
                case NOT_FOUND -> ErrorType.NOT_FOUND;
                case CONFLICT -> ErrorType.BAD_REQUEST; // GraphQL doesn't have CONFLICT, use BAD_REQUEST
                default -> ErrorType.INTERNAL_ERROR;
            };
        }
        
        // Fallback for custom status codes
        int value = statusCode.value();
        if (value >= 400 && value < 500) {
            return ErrorType.BAD_REQUEST;
        } else if (value >= 500) {
            return ErrorType.INTERNAL_ERROR;
        }
        return ErrorType.INTERNAL_ERROR;
    }

    public static class AlreadyEnrolledException extends RuntimeException {
        public AlreadyEnrolledException(String message) {
            super(message);
        }
    }
}
