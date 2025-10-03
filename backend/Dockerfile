# ---- build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline
COPY src ./src
# if there is swagger codegen/openapi, package can be added before the generation
RUN mvn -q -DskipTests package

# ---- runtime stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app
ENV JAVA_OPTS=""
# logs
RUN mkdir -p /var/log/app
COPY --from=build /app/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]
