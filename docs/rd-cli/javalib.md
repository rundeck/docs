# Rundeck CLI - Java API Library

The Java library used by RD can be used as a dependency in your Java project to call Rundeck APIs.

## Javadoc

[rd-api-client ![javadoc](https://javadoc.io/badge2/org.rundeck.api/rd-api-client/javadoc.svg)](https://javadoc.io/doc/org.rundeck.api/rd-api-client)

## Gradle usage

A demo project can be seen here: <https://github.com/gschueler/rd-api-demo>

~~~{groovy}
//use maven central
repositories {
    mavenCentral()
}

dependencies {
    compile "org.rundeck.api:rd-api-client:{{$cliVersion}}"
}
~~~
