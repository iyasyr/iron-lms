package com.ironhack.lms.config;

import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLScalarType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Configuration
public class GraphqlWiringConfig {
    
    @Bean
    RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return builder -> builder
                .scalar(createDateTimeScalar())
                .scalar(ExtendedScalars.GraphQLLong);
    }
    
    private GraphQLScalarType createDateTimeScalar() {
        return GraphQLScalarType.newScalar()
                .name("DateTime")
                .description("A custom DateTime scalar that handles both LocalDateTime and OffsetDateTime")
                .coercing(new graphql.schema.Coercing<Object, String>() {
                    @Override
                    public String serialize(Object dataFetcherResult) {
                        if (dataFetcherResult == null) {
                            return null;
                        }
                        
                        if (dataFetcherResult instanceof OffsetDateTime) {
                            return ((OffsetDateTime) dataFetcherResult).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                        } else if (dataFetcherResult instanceof LocalDateTime) {
                            return ((LocalDateTime) dataFetcherResult).atOffset(ZoneOffset.UTC)
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                        } else if (dataFetcherResult instanceof java.time.Instant) {
                            return ((java.time.Instant) dataFetcherResult).atOffset(ZoneOffset.UTC)
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                        }
                        
                        throw new IllegalArgumentException("Cannot serialize " + dataFetcherResult.getClass() + " as DateTime");
                    }
                    
                    @Override
                    public Object parseValue(Object input) {
                        if (input == null) {
                            return null;
                        }
                        
                        if (input instanceof String) {
                            return OffsetDateTime.parse((String) input, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                        }
                        
                        throw new IllegalArgumentException("Cannot parse " + input.getClass() + " as DateTime");
                    }
                    
                    @Override
                    public Object parseLiteral(Object input) {
                        if (input == null) {
                            return null;
                        }
                        
                        if (input instanceof String) {
                            return OffsetDateTime.parse((String) input, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
                        }
                        
                        throw new IllegalArgumentException("Cannot parse literal " + input.getClass() + " as DateTime");
                    }
                })
                .build();
    }
}
