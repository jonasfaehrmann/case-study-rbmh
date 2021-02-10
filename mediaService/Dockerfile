FROM adoptopenjdk/maven-openjdk11 AS MAVEN_BUILD
COPY pom.xml /build/
COPY src /build/src/

WORKDIR /build/
RUN mvn package

FROM openjdk:11-jdk

WORKDIR /app
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

ARG JAR_FILE=/build/target/*.jar
COPY --from=MAVEN_BUILD ${JAR_FILE} /app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]