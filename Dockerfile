FROM openjdk:17-oracle

LABEL maintainer="ltgabriel@mapua.edu.ph"

WORKDIR /opt/app

EXPOSE 8080

# Copy the built jar from target folder
COPY target/project-management-0.0.1-SNAPSHOT.jar /opt/app/project-management.jar

# Run the jar
ENTRYPOINT ["java", "-jar", "project-management.jar"]
