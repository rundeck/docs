# Rundeck CLI - Java API Library

The Java library used by RD can be used as a dependency in your Java project to call Rundeck APIs.

## Javadoc

[rd-api-client ![javadoc](https://javadoc.io/badge2/org.rundeck.api/rd-api-client/javadoc.svg)](https://javadoc.io/doc/org.rundeck.api/rd-api-client)

## Gradle usage

A demo project can be seen here: <https://github.com/gschueler/rd-api-demo>

Starting with `rd-api-client` version `2.1.4`, releases are published to PagerDuty's PackageCloud repository instead of Maven Central. Versions `2.1.3` and earlier remain permanently available on Maven Central.

~~~{groovy}
// rd-api-client 2.1.4+ is published to PagerDuty's PackageCloud repository (no credentials required to read)
repositories {
    maven {
        url "https://packagecloud.io/pagerduty/rundeck/maven2"
    }
    mavenCentral() //for rd-api-client versions 2.1.3 and earlier
}

dependencies {
    implementation "org.rundeck.api:rd-api-client:{{$cliVersion}}"
}
~~~
