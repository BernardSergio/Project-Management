# Use the maintained OpenJDK 17 image from Eclipse Temurin (official replacement)
FROM eclipse-temurin:17-jdk

LABEL maintainer="ltgabriel@mapua.edu.ph"

# Set working directory inside the container
WORKDIR /opt/app

# Expose the application port
EXPOSE 8080

# Copy the built JAR from your local target folder into the container
COPY target/project-management-0.0.1-SNAPSHOT.jar /opt/app/project-management.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "project-management.jar"]
