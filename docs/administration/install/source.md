# Installing from Source

## Installing from Source

Checkout the sources from [GitHub](https://github.com/rundeck/rundeck)

You can build either the executable war (self-running archive), or a RPM/Deb.

    ./gradlew build

Creates artifacts:

- `rundeckapp/build/libs/rundeck-X.Y.war`

Build the RPM (requires `rpm` command):

    make rpm

Build the DEB (requires `dpkg` command):

    make deb

To build clean:

    make clean

## Documentation

The documentation is in a separate repo: <https://github.com/rundeck/docs>.

Once you check out the documentation source, documentation can be built using: `make`.

Documentation build requires [pandoc](https://pandoc.org/) and [groovy](http://groovy-lang.org/).
