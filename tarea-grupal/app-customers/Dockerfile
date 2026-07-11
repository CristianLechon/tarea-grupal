FROM eclipse-temurin:25-jre

WORKDIR /app

# No encuentro los otros comandos lptm, los q buildeaban la imagen xd
COPY build/libs/*.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"]
