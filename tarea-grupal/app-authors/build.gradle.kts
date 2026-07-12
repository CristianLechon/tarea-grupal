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

val quarkusVersion = "3.37.2"

java {
    sourceCompatibility = JavaVersion.VERSION_25
    targetCompatibility = JavaVersion.VERSION_25
}

dependencies {
    implementation(enforcedPlatform("io.quarkus:quarkus-bom:$quarkusVersion"))
    implementation("io.quarkus:quarkus-arc")

    // Jakarta REST (JAX-RS)
    implementation("io.quarkus:quarkus-rest")
    implementation("io.quarkus:quarkus-rest-jsonb")

    // Hibernate ORM + Panache
    implementation("io.quarkus:quarkus-hibernate-orm")
    implementation("io.quarkus:quarkus-hibernate-orm-panache")

    implementation("io.quarkus:quarkus-jdbc-postgresql")
    // Flyway
    implementation("io.quarkus:quarkus-flyway")
    runtimeOnly("org.flywaydb:flyway-database-postgresql:12.5.0")

    // MicroProfile REST Client
    implementation("io.quarkus:quarkus-smallrye-stork")
    // Vert.x ConsulClient programático
    implementation("io.smallrye.reactive:smallrye-mutiny-vertx-consul-client")
    // MicroProfile Health
    implementation("io.quarkus:quarkus-smallrye-health")
    // Telemetria
    implementation("io.quarkus:quarkus-micrometer-registry-prometheus")



}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs.add("-parameters")
}
