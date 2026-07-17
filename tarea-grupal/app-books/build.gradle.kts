plugins {
    id("java")
    id("io.quarkus") version "3.37.2"
    id("io.freefair.lombok") version "9.2.0"
}

group = "com.programacion.distribuida"
version = "unspecified"

repositories {
    mavenCentral()
}

val quarkusVersion= "3.37.2"

java {
    sourceCompatibility = JavaVersion.VERSION_25
    targetCompatibility = JavaVersion.VERSION_25
}
dependencies {
    implementation(enforcedPlatform("io.quarkus:quarkus-bom:$quarkusVersion"))

    // Core de Quarkus y REST
    implementation("io.quarkus:quarkus-arc")
    implementation("io.quarkus:quarkus-rest")
    implementation("io.quarkus:quarkus-rest-jsonb")
    implementation("io.quarkus:quarkus-jackson")

    // Base de datos (Hibernate, PostgreSQL, Flyway)
    implementation("io.quarkus:quarkus-hibernate-orm")
    implementation("io.quarkus:quarkus-hibernate-orm-panache")
    implementation("io.quarkus:quarkus-jdbc-postgresql")

    // REST Client, Stork y Fault Tolerance (Circuit Breaker)
    implementation("io.quarkus:quarkus-rest-client")
    implementation("io.quarkus:quarkus-smallrye-stork")
    implementation("io.smallrye.stork:stork-service-discovery-consul")
    implementation("io.smallrye.reactive:smallrye-mutiny-vertx-consul-client")
    implementation("io.quarkus:quarkus-smallrye-fault-tolerance")

    // Health Checks y Métricas
    implementation("io.quarkus:quarkus-smallrye-health")
    implementation("io.quarkus:quarkus-micrometer-registry-prometheus")

}

tasks.test {
    useJUnitPlatform()
}