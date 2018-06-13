%  Installing from Source

## Installing from Source

Checkout the sources from [GitHub](https://github.com/rundeck/rundeck)

You can build either the launcher jar (self-running archive), or a RPM.

    ./gradlew build

Creates artifacts:

* `rundeckapp/target/rundeck-X.Y.war`
* `rundeck-launcher/launcher/build/libs/rundeck-launcher-X.Y.jar`

Build the RPM:

    make rpm

To build clean:

    make clean

Documentation can be built using: `make clean docs`.  Documentation build requires [pandoc](https://pandoc.org/).  The RPM build depends on the
documentation as well.
